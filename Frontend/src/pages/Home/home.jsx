import { useNavigate } from 'react-router-dom';
const video = "https://res.cloudinary.com/df8pktsi5/video/upload/v1772537535/frontend-assets/xyipcf5lq9yslnh8edyk.mp4";
import Footer from '../../Components/Footer/footer';
import './home.css';
import Contact from '../Contact/contact';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <section className="homefirst-section">
                <div className="hero-content">
                    <h1>Experience Your Next Adventure</h1>
                    <p>Discover, book, and enjoy the most exclusive events in the city. From high-energy concerts to professional workshops.</p>
                    <div className="hero-btns">
                        <button className="primary-btn" onClick={() => navigate('/events')}>Explore Events</button>
                    </div>
                </div>
            </section>

            <section className="homesecond-section">
                <div className="center">
                    <div className="leftpart">
                        <h2 className='abouth'>About Our Vision</h2>
                        <p className='about'>Welcome to AK Booking, your ultimate destination for discovering and booking exciting events. We bridge the gap between passion and participation.</p>

                        <div className="features-grid">
                            <div className="feature-item">
                                <h3>Curated Selection</h3>
                                <p>From music concerts to business conferences, we bring only the best to your screen.</p>
                            </div>
                            <div className="feature-item">
                                <h3>Seamless Booking</h3>
                                <p>Razorpay integration ensures your transactions are as smooth as the events themselves.</p>
                            </div>
                        </div>
                    </div>
                    <div className="rightpart">
                        <img src="https://res.cloudinary.com/df8pktsi5/image/upload/v1772537527/frontend-assets/uzyfwbn8bglpoyzbyqzd.jpg" alt="Coldplay Event" />
                    </div>
                </div>
            </section>

            <section className="homethird-section">
                <div className="meet">
                    <h1>Legendary Headliners</h1>
                </div>
                <div className="artist">
                    <div className="names">
                        <img src='https://res.cloudinary.com/df8pktsi5/image/upload/v1772537529/frontend-assets/ba6tm46myh06ff11jtim.jpg' alt="Vedan" />
                    </div>
                    <div className="names1">
                        <div className="rightimg">
                            <img src='https://res.cloudinary.com/df8pktsi5/image/upload/v1772537530/frontend-assets/lt42a3uvgrnporbadups.jpg' alt="Dabzee" />
                        </div>
                        <div className="rightimg1">
                            <img src='https://res.cloudinary.com/df8pktsi5/image/upload/v1772537532/frontend-assets/bpbuortlfx8s2zs4d4jc.jpg' alt="Rihanna" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact">
                <Contact />
            </section>
        </div>
    );
};


export default Home;
