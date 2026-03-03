import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { ToastContainer, toast } from 'react-toastify';
import axios from "../../Utils.js/axios"
import './edit.css';

const EditEvents = () => {
  const [data, setData] = useState({ name: "", description: "", date: "", time: "", availableseats: "", image: '', location: '' })
  const navigate = useNavigate();
  const { id } = useParams();


  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value })
  };

  const uploadImage = async e => {
    const imageData = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', imageData);
    const response = await axios.post("/image/upload", formData);

    setData({ ...data, image: response.data.url });
  }

  const getEventById = async () => {
    const response = await axios.get("/event/details/" + id);
    setData(response.data)
    //  console.log(response.data);
  }

  const onEditBtn = async () => {
    // e.preventDefault();
    try {
      const response = await axios.patch(`/event/edit/${id}`, data);
      toast.success('Event updated successfully!');

    } catch (error) {
      toast.error('Error booking event:', error);
    }
  };

  useEffect(() => {
    getEventById()
  }, [])

  console.log(data);

  return (
    <div className="container">
      <div className="add">
        <h2>Update Event</h2>
        <div className='flex-col'>
          <ToastContainer />
          <div className="add-event-name flex-col">
            <p>Event Name</p>
            <Input value={data.name} onChange={e => { onChange(e, 'name') }} name="name" placeholder='Type here' required />
          </div>
          <div className="add-event-description flex-col">
            <p>Description</p>
            <textarea value={data.description} onChange={e => { onChange(e, 'description') }} name='descritption' rows="5" placeholder='Write content here' required ></textarea>
          </div>

          <div className="multi-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="add-event-date flex-col">
              <p>Date</p>
              <Input value={data.date} onChange={e => { onChange(e, 'date') }} name='date' required />
            </div>

            <div className="add-event-date flex-col">
              <p>Time</p>
              <Input value={data.time} onChange={e => { onChange(e, 'time') }} required />
            </div>
          </div>

          <div className="add-event-seats flex-col">
            <p>Available Seats</p>
            <Input value={data.availableseats} onChange={e => { onChange(e, 'availableseats') }} name='seats' required />
          </div>

          <div className='add-event-location flex-col'>
            <p>Location</p>
            <select value={data.location} onChange={e => { onChange(e, 'location') }} name='location' required>
              <option>mumbai</option>
              <option>kerala</option>
              <option>kochi</option>
              <option>thrissur</option>
              <option>Calicut</option>
              <option>Coimbatore</option>
            </select>
          </div>


          <div className="add-event-image flex-col">
            <p>Event Image</p>
            <Input onChange={uploadImage} name='image' required />
          </div>

          <button onClick={onEditBtn} className='btn'>UPDATE EVENT</button>
        </div>
      </div>
    </div>
  );
};


export default EditEvents;
