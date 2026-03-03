import React from "react";
import './footer.css'

const Footer = () => {
  return (

    <div className="foter">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About AK Event</h3>
          <p>Discover and book amazing events seamlessly. Your go-to platform for exclusive concerts, workshops, and high-energy experiences.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/contact">Support</a></li>
            <li><a href="/booking">My Bookings</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="social-icon"><i className="fa-brands fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AK Event Booking. All Rights Reserved.</p>
      </div>
    </div>





  )
}

export default Footer;