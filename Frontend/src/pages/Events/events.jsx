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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(events.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
        setCurrentPage(1); // Reset to first page on filter change
    };


    const eventDeatils = (_id) => {
        navigate('/details/' + _id);
    }



    return (
        <div className="event">
            <header className="event-header">
                <h1>Upcoming Events</h1>
                <p className="subtitle">Discover the most exclusive events happening in the city</p>
                <div className="filter-bar">
                    <div className="filter-item">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search event by name..."
                            name="name"
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className="filter-item">
                        <i className="fa-solid fa-location-dot"></i>
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

            {events.length === 0 ? (
                <div className="no-events">
                    <i className="fa-solid fa-calendar-xmark"></i>
                    <h2>No events found matching your search.</h2>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            ) : (
                <>
                    <div className="event-card">
                        {currentItems.map((item, index) => {
                            return (
                                <div key={index} className="event-card-model" onClick={() => eventDeatils(item._id)}>
                                    <div className="img-container">
                                        <img src={item.image} alt={item.name} />
                                        <div className="date-badge">
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                    <div className="event-card-content">
                                        <div className="event-info">
                                            <p className='name'>{item.name}</p>
                                            <p className="location-text"><i className="fa-solid fa-location-dot"></i> {item.location}</p>
                                        </div>
                                        <div className="event-stats">
                                            <span className={item.availableseats > 0 ? 'seats-left' : 'sold-out'}>
                                                {item.availableseats > 0
                                                    ? `${item.availableseats} Seats Available`
                                                    : 'Sold Out'}
                                            </span>
                                            <button className="view-btn">View Details</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="page-nav-btn"
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="page-nav-btn"
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    )}
                </>
            )}

            <div className="foter">
                <Footer />
            </div>
        </div>
    );
};


export default Events;
