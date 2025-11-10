import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUser, setTotalUser] = useState(0)
  const limit = 10; // số user trên mỗi trang

  const token = sessionStorage.getItem("accessToken");

  const getAllUsers = async (pageNumber = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:9999/users?page=${pageNumber}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("User: " + response.data.totalUsers);

      
      setUsers(response.data.filterUsers);
      setPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalUser(response.data.totalUsers)
    } catch (err) {
      console.error("Lỗi khi lấy danh sách user:", err);
    }
  };

  const updateProfile = async (name, email, id) => {
    try {
       const response = await axios.post(
        `http://localhost:9999/users/${id}`,
        { name, email  }
      );
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getAllUsers();
  }, []);

  const value = { users, getAllUsers, setUsers, page, setPage, totalPages, totalUser, updateProfile };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
