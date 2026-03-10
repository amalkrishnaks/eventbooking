import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import { ToastContainer, toast } from 'react-toastify';
import './login.css';
import Events from '../../pages/Events/events';




const Login = ({ setShowLogin }) => {

    const navigate = useNavigate();
    const [currState, setCurrState] = useState("Login");
    const [login, setLogin] = useState({ name: '', email: '', password: '' })

    const onChange = (e, key) => {
        setLogin({ ...login, [key]: e.target.value });
    }


    const onClick = async () => {
        try {
            if (currState === 'Login') {
                const response = await axios.post('/user/login', login)
                localStorage.setItem('token', response.data.token);
                setShowLogin(false)
                navigate('/');
                console.log(response);
            } else {
                const response = await axios.post('/user/signup', login)
                console.log(response.data);
                toast.success("Registeration successful!");
            }


        } catch (e) {
            console.log(e);
            toast.error('Email or Password Incorrect')
        }
    }
    console.log(login);



    return (
        <div className="login">
            <div className="login-popup-container">
                <ToastContainer />
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src='https://res.cloudinary.com/df8pktsi5/image/upload/v1772537624/frontend-assets/rkprb1l31s7jby8ddrtf.png' alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === 'Login' ? null : (
                        <input
                            onChange={e => onChange(e, 'name')}
                            type='text'
                            placeholder='Your name'
                            required
                        />
                    )}
                    <input
                        onChange={e => onChange(e, 'email')}
                        type='email'
                        placeholder='Your Email'
                        required
                    />
                    <input
                        onChange={e => onChange(e, 'password')}
                        type='password'
                        placeholder='Password'
                        required
                    />
                </div>

                <button className="primary-btn" onClick={onClick}>
                    {currState === 'Sign Up' ? 'Create Account' : 'Login'}
                </button>

                <div className="login-popup-condition">
                    <input type='checkbox' required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === 'Login' ? (
                    <p>New to AK Event? <span onClick={() => setCurrState('Sign Up')}>Create Account</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                )}
            </div>
        </div>
    )
};


export default Login