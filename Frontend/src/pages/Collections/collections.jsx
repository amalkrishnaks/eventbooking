import { useEffect, useState } from 'react';
import './collection.css';
import axios from '../../services/axios'
import Footer from '../../Components/Footer/footer';
import { ToastContainer, toast } from 'react-toastify';
import { QRCodeSVG } from 'qrcode.react';

const Collections = () => {
    const [collection, setCollection] = useState([]);
    const [showTicket, setShowTicket] = useState(null); // Stores the order object for the selected ticket

    const fetchOrder = async () => {
        try {
            const response = await axios.post('/order/userorder');
            setCollection(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    const cancelBooking = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const response = await axios.post('/order/cancel', { orderId });

            if (response.data.success) {
                toast.success("Booking cancelled successfully!");
                fetchOrder(); // Refresh history
            } else {
                toast.error(response.data.message || "Failed to cancel booking");
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            toast.error(error.response?.data?.message || "An error occurred during cancellation");
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <div className="my-orders">
            <ToastContainer />
            <header className="my-orders-header">
                <h1>My Event Bookings</h1>
                <p>Manage your tickets and view booking history.</p>
            </header>
            <div className="container">
                {collection.length > 0 ? (
                    collection.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <div className="order-items-list">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="order-item-info">
                                        <p className="order-item-title">{item.name}</p>
                                        <div className="order-item-meta">
                                            <span><i className="fa-solid fa-calendar-days"></i> {item.date}</span>
                                            <span>|</span>
                                            <span><i className="fa-solid fa-location-dot"></i> {item.location}</span>
                                        </div>
                                        <p className="order-item-meta">
                                            <i className="fa-solid fa-ticket"></i> {order.ticketCount || 1} tickets
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="order-amount-box">
                                <p className="order-label">Total Paid</p>
                                <p className="order-amount">₹{order.amount}.00</p>
                            </div>
                            <div className="order-status-box">
                                <p className="order-label">Status</p>
                                <p className={`order-status ${order.status?.toLowerCase()}`}>
                                    <i className="fa-solid fa-circle" style={{ fontSize: '8px' }}></i>
                                    {order.status}
                                </p>
                            </div>

                            <div className="order-actions">
                                {order.status !== 'Cancelled' && (
                                    <>
                                        <button
                                            className='primary-btn ticket-btn'
                                            onClick={() => setShowTicket(order)}
                                        >
                                            <i className="fa-solid fa-qrcode"></i> View Ticket
                                        </button>
                                        <button
                                            className='primary-btn cancel-btn'
                                            onClick={() => cancelBooking(order._id)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                                <button className='primary-btn track-btn' title="Refresh Status" onClick={fetchOrder}>
                                    <i className="fa-solid fa-rotate-right"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-bookings">
                        <i className="fa-solid fa-calendar-xmark" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                        <p>No bookings found yet. Explore some events!</p>
                    </div>
                )}
            </div>

            {/* Ticket QR Modal */}
            {showTicket && (
                <div className="ticket-modal-overlay" onClick={() => setShowTicket(null)}>
                    <div className="ticket-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-ticket" onClick={() => setShowTicket(null)}><i className="fa-solid fa-xmark"></i></button>
                        <div className="ticket-header">
                            <h2>E-Ticket</h2>
                            <p>Show this QR code at the entrance</p>
                        </div>
                        <div className="qr-container">
                            <QRCodeSVG
                                value={JSON.stringify({
                                    orderId: showTicket._id,
                                    eventId: showTicket.eventId,
                                    date: showTicket.date,
                                    tickets: showTicket.ticketCount
                                })}
                                size={200}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                        <div className="ticket-details-footer">
                            <h3>{showTicket.items[0]?.name}</h3>
                            <p><strong>Order ID:</strong> {showTicket._id}</p>
                            <p><strong>Tickets:</strong> {showTicket.ticketCount} Total</p>
                            <p><strong>Status:</strong> <span className={showTicket.status.toLowerCase()}>{showTicket.status}</span></p>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Collections;
