import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../Utils.js/axios"
import { ToastContainer,toast } from 'react-toastify';
import './login.css';

const Login=()=>{
    const navigate=useNavigate()
    const [login,setLogin]=useState({name:'',password:''})

        const onChange=(e,key)=>{
            setLogin({...login, [key]: e.target.value});
        }

        const onClick=async()=>{
            try {
                 const response=await axios.post('/admin/adminlogin',login);
                localStorage.setItem('adminToken',response.data.token);
                navigate('/add');
                console.log(response.data);
            } catch (error) {
                toast.error("Invalid credentials");
            }
           
           
        }
        console.log(login);
        
    return(
        <div className="login">
        <div className="login-container">
            <ToastContainer/>
             <h2>Admin Login</h2>
                <input onChange={e=>onChange(e,'name')} type='text' placeholder='Your name' />
                {/* <input onChange={e=>onChange(e,'email')} type='text' placeholder='Your Email' /> */}
                <input onChange={e=>onChange(e,'password')}  type='password' placeholder='Password' />

                <button onClick={onClick}>Login</button>
        </div>
        </div>
    )
}

export default Login;