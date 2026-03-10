import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import Modal from '../../Components/Modal/modal';
import './details.css';
import Footer from '../../Components/Footer/footer';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000', {
    transports: ['websocket']
});


const Details = () => {



    const [event, setEvent] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const navigate = useNavigate()

    const eventId = window.location.pathname.split("/")[2];

    useEffect(() => {
        axios.get(`/user/details/${eventId}`).then((res) => {
            setEvent(res.data);
        })

        socket.on('seatUpdated', (data) => {
            if (data.eventId === eventId) {
                setEvent(prev => ({ ...prev, availableseats: data.newAvailableSeats }));
            }
        });

        return () => {
            socket.off('seatUpdated');
        };
    }, [eventId])

    const onClick = () => {
        setShowDeleteModal(true)
    }

    if (!event) return <div>Loading...</div>;

    return (
        <div className="detail">
            <Modal show={showDeleteModal} setModal={setShowDeleteModal} event={event} />
            <div className="events-details">
                <div className="eventbasic-details">
                    <div className="event-image">
                        <img src={event.image} alt={event.name} />
                    </div>
                </div>
                <div className="eventdata-details">
                    <h1 className='name'>{event.name}</h1>
                    <div className="datee">
                        <i className="fa-solid fa-calendar-days"></i>
                        <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="locations">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{event.location} {event.address}</span>
                    </div>

                    <div className="event-about">
                        <p>About This Event</p>
                        <p>{event.description}</p>
                    </div>

                    <div className="seat-status">
                        <span className={event.availableseats > 0 ? 'seats-pill' : 'sold-pill'}>
                            {event.availableseats > 0 ? `${event.availableseats} Seats Remaining` : 'Fully Booked'}
                        </span>
                    </div>

                    <button
                        onClick={onClick}
                        className='btn2'
                        disabled={event.availableseats <= 0}
                    >
                        {event.availableseats > 0 ? 'Purchase Ticket' : 'Sold Out'}
                    </button>
                </div>
            </div>

            <div className="fter">
                <Footer />
            </div>
        </div>
    );
};


export default Details;


















































































