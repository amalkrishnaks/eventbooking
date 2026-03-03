import { useEffect, useState } from 'react';
import './collection.css';
import axios from '../../Utils/axios'
import Footer from '../../Components/Footer/footer';




const Collections = () => {
    const [collection, setCollection] = useState([]);

    const fetchOrder = async () => {
        const response = await axios.post('/order/userorder');
        setCollection(response.data.orders)
        console.log(response.data.orders);

    }

    useEffect(() => {
        fetchOrder()
    }, [])


    console.log(collection);


    return (
        <div className="my-orders">
            <header className="my-orders-header">
                <h1>My Event Bookings</h1>
            </header>
            <div className="container">
                {collection.length > 0 ? (
                    collection.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <div className="order-items-list">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="order-item-info">
                                        <p className="order-item-title">{item.name}</p>
                                        <p className="order-item-meta">
                                            <i className="fa-solid fa-calendar-days"></i> {item.date} |
                                            <i className="fa-solid fa-location-dot"></i> {item.location}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <p className="order-amount">₹{order.amount}.00</p>
                            <p className={`order-status ${order.status.toLowerCase()}`}>
                                <i className="fa-solid fa-circle" style={{ fontSize: '8px' }}></i>
                                {order.status}
                            </p>
                            <p className="order-payment">{order.payment ? 'Paid' : 'Pending'}</p>
                            <button className='primary-btn track-btn' onClick={fetchOrder}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem' }}>
                        <i className="fa-solid fa-calendar-xmark" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                        <p>No bookings found yet. Explore some events!</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};


export default Collections;
