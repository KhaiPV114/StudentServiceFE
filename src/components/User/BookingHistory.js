import React, { useState, useEffect } from 'react';
import { Table, Badge, Container } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const endpoint = user.role === 'staff' 
                    ? '/api/bookings/all'  // For staff to see all bookings
                    : `/api/bookings/user/${user.id}`; // For students to see their own bookings
                
                const response = await axios.get(endpoint);
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return <Badge bg="success">Duyệt</Badge>;
            case 'rejected':
                return <Badge bg="danger">Từ chối</Badge>;
            case 'pending':
                return <Badge bg="warning">Đang chờ</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const handleStatusUpdate = async (bookingId, newStatus) => {
        if (user.role !== 'staff') return;
        
        try {
            await axios.put(`/api/bookings/${bookingId}/status`, {
                status: newStatus
            });
            // Refresh booking list after update
            const response = await axios.get('/api/bookings/all');
            setBookings(response.data);
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <h2>Danh sách Booking</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        {user.role === 'staff' && <th>Người đặt</th>}
                        <th>Ngày đặt</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Phòng/Thiết bị</th>
                        <th>Trạng thái</th>
                        {user.role === 'staff' && <th>Hành động</th>}
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            {user.role === 'staff' && <td>{booking.userName}</td>}
                            <td>{new Date(booking.bookingDate).toLocaleDateString('vi-VN')}</td>
                            <td>{booking.startTime}</td>
                            <td>{booking.endTime}</td>
                            <td>{booking.resourceName}</td>
                            <td>{getStatusBadge(booking.status)}</td>
                            {user.role === 'staff' && (
                                <td>
                                    {booking.status === 'pending' && (
                                        <>
                                            <button 
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleStatusUpdate(booking.id, 'approved')}
                                            >
                                                Duyệt
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleStatusUpdate(booking.id, 'rejected')}
                                            >
                                                Từ chối
                                            </button>
                                        </>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default BookingHistory;