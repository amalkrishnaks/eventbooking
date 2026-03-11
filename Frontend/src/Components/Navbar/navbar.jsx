import { checkToken } from '../../services/check-token';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => {
        localStorage.removeItem('token');
        setShowLogin(true)
        navigate('/');
    }

    const handleLoginClick = () => {
        setIsOpen(false);
        setShowLogin(true);
    };


    return (
        <div className="navbar">
            <div className="navbar-menu">
                {/* <img className='logo' src='https://res.cloudinary.com/df8pktsi5/image/upload/v1772696644/Logo_event_vjeqge.png'></img> */}
                <h2>Event Hub</h2>
            </div>
            <ul className={`navbar-right ${isOpen ? "active" : ""}`}>
                <Link className='link' onClick={() => setIsOpen(false)} to='/' >Home</Link>
                <Link className='link' onClick={() => setIsOpen(false)} to='/events'>Events</Link>
                <Link className='link' onClick={() => setIsOpen(false)} to='/details/:id'>Details</Link>
                <Link className='link' onClick={() => setIsOpen(false)} to='/booking'>Booking</Link>
                <Link className='link' onClick={() => setIsOpen(false)} to='/collections'>collection</Link>

                {!localStorage.getItem('token') ? <button onClick={handleLoginClick}>sign in</button>
                    : <div className="navbar-profile">
                        <img src='https://res.cloudinary.com/df8pktsi5/image/upload/v1772537624/frontend-assets/a2r4wztuay2tfb2szi0g.png'></img>
                        <ul className='nav-profile-dropdown'>
                            <li><img onClick={onClick} src='https://res.cloudinary.com/df8pktsi5/image/upload/v1772537624/frontend-assets/u9nlyrdjsfhlh1gaygoe.png'></img><p>Logout</p></li>
                        </ul>
                    </div>

                }
            </ul>


            <div className="toogle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <i class="fa-solid fa-xmark" /> : <i class="fa-solid fa-bars"></i>}
            </div>

        </div>
    )
};

export default Navbar;