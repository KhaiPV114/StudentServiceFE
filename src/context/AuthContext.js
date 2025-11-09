import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeJwt = (token) => {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    try {
      // base64url -> base64
      let payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
      // pad with '='
      const pad = payload.length % 4;
      if (pad) payload += "=".repeat(4 - pad);
      const json = atob(payload);
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  };

  // Initialize from localStorage if tokens exist
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = decodeJwt(accessToken);
      if (decoded) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        setUser({
          id: decoded.id, 
          email: decoded.email,
          name: decoded.name,
          role: decoded.role,
          id: decoded._id,
        });
      } else {
        // invalid token
        localStorage.removeItem("accessToken");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:9999/auth/login", {
        email,
        password,
      });

      const { accessToken } = res.data;
      if (!accessToken) {
        throw new Error("Login failed: tokens not returned");
      }

      // store tokens
      localStorage.setItem("accessToken", accessToken);

      // set default auth header for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // decode token safely
      const decoded = decodeJwt(accessToken);
      
      if (!decoded) {
        // token malformed; clear and error
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
        throw new Error("Received malformed access token");
      }

      const currentUser = {
        id: decoded.id,  
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      };

      localStorage.setItem("id", decoded.id);

      setUser(currentUser);

      // Navigate based on role
      const roleUpper = (decoded.role || "").toUpperCase();
      if (roleUpper === "ADMIN") navigate("/admin");
      else if (roleUpper === "STAFF") navigate("/staff");
      else navigate("/student");

      return currentUser;
    } catch (err) {
      // normalize error
      const message = err.response?.data?.message || err.message || "Login failed";
      throw new Error(message);
    }
  };

  const logout = (redirect = "/login") => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate(redirect);
    // optionally reload to reset app state
    // window.location.reload();
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
