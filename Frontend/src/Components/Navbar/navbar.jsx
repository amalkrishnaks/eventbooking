import { checkToken } from '../../Utils/check-token';
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



    return (
        <div className="navbar">
            <div className="navbar-menu">
                <h2>AK Event Booking</h2>
            </div>
            <ul className={`navbar-right ${isOpen ? "active" : ""}`}>
                <Link className='link' to='/' >Home</Link>
                <Link className='link' to='/events'>Events</Link>
                <Link className='link' to='/details/:id'>Details</Link>
                <Link className='link' to='/booking'>Booking</Link>
                <Link className='link' to='/collections'>collection</Link>

                {!localStorage.getItem('token') ? <button onClick={() => setShowLogin(true)}>sign in</button>
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