import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/home'
import Events from './pages/Events/events'
import Details from './pages/Details/details'
import Booking from './pages/Book Events/book'
import Collections from './pages/Collections/collections'
import Navbar from './Components/Navbar/navbar'
import Login from './Components/Login/login'
import PrivateRoute from './Components/privateRoute'
import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer/footer'
import Contact from './pages/Contact/contact'




const App=()=>{
 
  const [showLogin,setShowLogin]=useState(false)

  return (
    <>
  
    {showLogin ? <Login setShowLogin={setShowLogin}/> : <></>}
      <div className="app">    
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>

        <Route path='/' element={<Home/>}/>

        <Route path='/' element={<PrivateRoute/>}>

        <Route path='/events' element={<Events/>}/>
        <Route path='/details/:id' element={<Details/>}/>  
        <Route path='/booking' element={<Booking/>}/>
        <Route path='/collections' element={<Collections/>}/>
        <Route path='/contact' element={<Contact/>}/>
        </Route>

        
       
        
      </Routes>
  </div>
      
   
   </>
  )
}

export default App
