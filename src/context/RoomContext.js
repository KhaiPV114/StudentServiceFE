import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [slots, setSlots] = useState([]);
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [slotId, setSlotId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(
    "location: " + location + " slotId: " + slotId + " date: " + date
  );

  const getRooms = async () => {
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9999/rooms`);
      //   console.log(response.data);
      setRooms(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch rooms");
      throw err;
    }
  };

  const getSlots = async () => {
    setError(null);
    try {
      const response = await axios.get(`http://localhost:9999/slots`);
      //   console.log(response.data);
      setSlots(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch slots");
      throw err;
    }
  };

  const getRoomsAvailable = async () => {
    if (!location || !date || !slotId) return; // Only fetch when all selected

    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:9999/rooms/availability/${location}/${slotId}/${date}`
      );
      setRoomsAvailable(response.data.data); // note: backend returns { success, data: [...] }
      return response.data.data;
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch available rooms"
      );
    }
  };

  useEffect(() => {
    getRooms();
    getSlots();
  }, []);

  useEffect(() => {
    getRoomsAvailable();
  }, [location, date, slotId]);

  // You can add more functions here like:
  // - createRoom
  // - updateRoom
  // - deleteRoom
  // - getRoomDetails
  // etc.

  const value = {
    rooms,
    error,
    slots,
    roomsAvailable,
    location,
    setLocation,
    date,
    setDate,
    slotId,
    setSlotId,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export default RoomContext;
