import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../Utils.js/axios"
import { ToastContainer, toast } from 'react-toastify';
import './list.css';


const ListEvents = () => {

    const [list, setList] = useState([]);
    const navigate = useNavigate()

    const fetchList = async () => {
        const response = await axios.get("/event/list");
        setList(response.data.data);
        // console.log(response);
    }
    const removeEvent = async (Id) => {
        const response = await axios.delete("/event/remove/" + Id)
        fetchList();
        if (response.data.success) {
            toast.success("Remove")
        }
        else {
            toast.error("error")
        }
    }

    useEffect(() => {
        fetchList()
    }, [])



    return (
        <div className="list">
            <ToastContainer />
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Event Name</b>
                    <b>Description</b>
                    <b>Date</b>
                    <b>Time</b>
                    <b>Seats</b>
                    <b>Location</b>
                    <b>Address</b>
                    <b>Image</b>
                    <p style={{ textAlign: 'center' }}>Actions</p>
                    <p></p>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className="list-table-format">
                            <p>{item.name}</p>
                            <p className="description-cell" title={item.description}>
                                {item.description.length > 50 ? item.description.substring(0, 50) + "..." : item.description}
                            </p>
                            <p>{item.date}</p>
                            <p>{item.time}</p>
                            <p>{item.availableseats}</p>
                            <p>{item.location}</p>
                            <p>{item.address}</p>
                            <img src={item.image} alt={item.name} />
                            <i className="fa-solid fa-trash cursor" onClick={() => removeEvent(item._id)}></i>
                            <i className="fa-solid fa-pen-to-square Edit" onClick={() => navigate('/edit/' + item._id)}></i>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


export default ListEvents;