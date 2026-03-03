import { Link } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="navbar">
            <div className="navbar-menu">
                <h3>AK EVENT ADMIN</h3>
            </div>
            <ul className={`navbar-right ${isOpen ? "active" : ""}`}>
                <li><Link className='link' to="/add" onClick={() => setIsOpen(false)}>Add Events</Link></li>
                <li><Link className='link' to="/list" onClick={() => setIsOpen(false)}>List Events</Link></li>
                <li><Link className='link' to="/booking" onClick={() => setIsOpen(false)}>Bookings</Link></li>
            </ul>

            <div className="toogle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
            </div>
        </div>
    );
};


export default Navbar;