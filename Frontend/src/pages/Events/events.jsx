import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import './events.css';
import Footer from '../../Components/Footer/footer';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL || '/', {
    transports: ['websocket']
});


const Events = () => {

    const [events, setEvent] = useState([]);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        name: '',
        location: ''
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/user/userevent', {
                    params: {
                        name: filters.name,
                        location: filters.location
                    }
                });
                setEvent(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [filters]);

    useEffect(() => {
        socket.on('seatUpdated', (data) => {
            setEvent((prevEvents) =>
                prevEvents.map((ev) =>
                    ev._id === data.eventId
                        ? { ...ev, availableseats: data.newAvailableSeats }
                        : ev
                )
            );
        });

        return () => {
            socket.off('seatUpdated');
        };
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };


    const eventDeatils = (_id) => {
        navigate('/details/' + _id);
    }



    return (
        <div className="event">
            <header className="event-header">
                <h1>Upcoming Events</h1>
                <div className="filter-bar">
                    <div className="filter-item">
                        <input
                            type="text"
                            placeholder="Search event by name..."
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="filter-item">
                        <input
                            type="text"
                            placeholder="Find by location..."
                            name="location"
                            value={filters.location}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
            </header>

            <div className="event-card">
                {events.map((item, index) => {
                    return (
                        <div key={index} className="event-card-model" onClick={() => eventDeatils(item._id)}>
                            <div className="img-container">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="event-card-content">
                                <p className='name'>{item.name}</p>
                                <div className="event-stats">
                                    <span className={item.availableseats > 0 ? 'seats-left' : 'sold-out'}>
                                        {item.availableseats > 0
                                            ? `${item.availableseats} Seats Available`
                                            : 'Sold Out'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="foter">
                <Footer />
            </div>
        </div>
    );
};


export default Events;
