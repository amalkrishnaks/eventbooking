import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Utils/axios';
import './events.css';
import Footer from '../../Components/Footer/footer';


const Events = () => {

    const [events, setEvent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            axios.get('/user/userevent').then((res) => {
                setEvent(res.data.data);
                console.log(events);

            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }, [setEvent]);


    const eventDeatils = (_id) => {
        navigate('/details/' + _id);
    }



    return (
        <div className="event">
            <header className="event-header">
                <h1>Upcoming Events</h1>
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
