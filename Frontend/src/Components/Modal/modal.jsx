
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './modal.css'

const Modal = ({ show = false, setModal, event }) => {

    const [ticketCount, setTicketCount] = useState(0);
    const ticketRate = 300;                    //example ticket price
    const totalPrice = ticketCount * ticketRate;
    const navigate = useNavigate()

    const proceedToPayment = () => {
        navigate("/booking", { state: { event, ticketCount, totalPrice } });
    }

    return (
        <div style={{ display: show ? 'flex' : 'none' }} className="modal">
            <div className="cover" onClick={() => setModal(false)}></div>
            <div className="modal-box">
                <div className="inside-modal">
                    <div className="modal-event-details">
                        <h2>{event.name}</h2>
                        <p><i className="fa-solid fa-location-dot"></i> {event.location}</p>
                        <p><i className="fa-solid fa-calendar"></i> {event.date}</p>
                    </div>

                    <div className="modal-event-ticketvalue">
                        <p>Number of Tickets</p>
                        <div className="event-item-counter">
                            <div className='math-btn' onClick={() => setTicketCount(prev => Math.max(0, prev - 1))}>
                                <i className="fa-solid fa-minus"></i>
                            </div>
                            <span>{ticketCount}</span>
                            <div className='math-btn' onClick={() => setTicketCount(prev => prev + 1)}>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <div className="totalprice">
                        Total: <span>₹{totalPrice}</span>
                    </div>
                    <button
                        onClick={proceedToPayment}
                        className='primary-btn'
                        disabled={ticketCount === 0}
                        style={{ opacity: ticketCount === 0 ? 0.5 : 1 }}
                    >
                        Confirm & Pay
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Modal;