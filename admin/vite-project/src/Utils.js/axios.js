import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/api/',
    timeout: 20000,
});


export default instance;
