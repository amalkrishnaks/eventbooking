import { useEffect, useState } from 'react';
import axios from "../../Utils.js/axios"
import './booking.css';

const BookingEvents = () => {
    const [booking, setBooking] = useState([]);

    const fetchAllOrders = async () => {
        const response = await axios.get('/order/listorder')
        setBooking(response.data.orders)
        console.log(response.data.orders);

    }
    const statusHandler = async (event, orderId) => {
        const response = await axios.post('/order/status', {
            orderId,
            status: event.target.value
        })
        if (response.data.success) {
            await fetchAllOrders();
        }


    }

    useEffect(() => {
        fetchAllOrders();
    }, [])
    return (
        <div className="order">
            <header className="my-orders-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #fff, var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Manage Bookings
                </h1>
            </header>
            <div className="order-list">
                {booking.length > 0 ? (
                    booking.map((orders, index) => {
                        return (
                            <div key={index} className="order-item">
                                <div className="order-items-info">
                                    {orders.items.map((item, idx) => (
                                        <div key={idx} className="my-order">
                                            <p>{item.name}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className='order-item-name'>{orders.address.firstname} {orders.address.lastname}</p>
                                <div className='order-item-address'>
                                    <p>{orders.address.city}, {orders.address.state}</p>
                                    <p>{orders.address.zipcode}</p>
                                </div>
                                <p className="order-phone"><i className="fa-solid fa-phone"></i> {orders.address.phonenumber}</p>
                                <p className="order-amount">₹{orders.amount}.00</p>
                                <select
                                    className={`status-select ${orders.status.toLowerCase()}`}
                                    onChange={(event) => statusHandler(event, orders._id)}
                                    value={orders.status}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Success">Success</option>
                                </select>
                            </div>
                        )
                    })
                ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem' }}>
                        <i className="fa-solid fa-receipt" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                        <p>No bookings found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default BookingEvents;