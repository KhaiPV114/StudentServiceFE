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

  const getRooms = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/rooms`);
      setRooms(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch rooms");
    }
  };

  const getSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/slots`);
      setSlots(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch slots");
    }
  };

  const getRoomsAvailable = async (location, slotId, date) => {
    if (!location || !slotId || !date) return;
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9999/rooms/availability/${location}/${slotId}/${date}`
      );
      
      setRoomsAvailable(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch available rooms");
    } finally {
      setLoading(false);
    }
  };

  const bookingRoom = async (userId, roomId, slotId, date) => {
    try {
      const response = await axios.post(
        `http://localhost:9999/roombookings`,
        { userId, roomId, slotId, date }
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book room");
    }
  };



  useEffect(() => {
    getRooms();
    getSlots();
  }, []);

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
    getRoomsAvailable,
    loading,
    setRoomsAvailable,
    bookingRoom,
  };

  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>;
};

export default RoomContext;
