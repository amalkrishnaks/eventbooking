# 🎟️ Event Hub - Premium Event Booking System

Event Hub is a full-stack, production-ready event discovery and booking platform. It features a modern, high-performance architecture with real-time updates, secure payments, and a premium Glassmorphism-inspired UI.

## ✨ Key Features

- **💎 Premium UI/UX**: Stunning dark-mode interface with Glassmorphism, smooth animations, and responsive design for all devices.
- **🔍 Real-time Search & Filtering**: Instant discovery of events by name or location with intelligent frontend pagination.
- **💳 Secure Payments**: Integrated with **Razorpay** for a seamless and secure checkout experience.
- **⚡ Real-time Updates**: Powered by **Socket.io** to reflect live seat availability across all connected users instantly.
- **🎟️ Smart Ticketing**: Automated QR Code generation for confirmed bookings.
- **👤 User Management**: Full authentication system with protected routes and personalized booking history.
- **⚙️ MVC Architecture**: Backend built with a clean Model-View-Controller structure for scalability and maintainability.

## 🛠️ Technology Stack

### Frontend
- **React.js** (Vite)
- **CSS3** (Vanilla with Modern CSS Variables)
- **Axios** (API Management)
- **Socket.io-Client** (Real-time updates)
- **React-Router-DOM** (Navigation)
- **QR Code React** (Ticket Generation)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **JSON Web Tokens (JWT)** (Security)
- **Razorpay SDK** (Payments)
- **Socket.io** (Real-time engine)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Razorpay API Keys

### 1. Clone the repository
```bash
git clone https://github.com/amalkrishnaks/eventbooking.git
cd eventbooking
```

### 2. Backend Setup
```bash
cd Backend
npm install
```
Create a `.env` file in the `Backend` folder:
```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_KEY=your_secret_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```
Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```
Create a `.env` file in the `Frontend` folder:
```env
VITE_BACKEND_URL=http://localhost:4000/api
```
Run the frontend:
```bash
npm run dev
```

---

## 🏗️ Project Structure

```text
EventBooking-System/
├── Backend/                 # MVC Architecture
│   ├── src/
│   │   ├── config/          # DB & Server Config
│   │   ├── controllers/     # Business Logic
│   │   ├── models/          # Mongoose Schemas
│   │   ├── routes/          # API Endpoints
│   │   ├── middlewares/     # Auth & Security
│   │   └── index.js         # Entry Point
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI Components
│   │   ├── pages/           # View Logic (Home, Events, Details, Booking)
│   │   ├── services/        # API & Axios Instance
│   │   ├── styles/          # Global & Modular CSS
│   │   └── main.jsx         # App Entry
```

## 🌐 Deployment

The project is configured for seamless deployment:
- **Backend**: Hosted on **Render** (Optimized with explicit long-format MongoDB URIs for DNS stability).
- **Frontend**: Hosted on **Vercel** (Configured with production proxies for cross-device mobile access).

---

## 📝 License
This project is licensed under the MIT License.

## 👨‍💻 Author
**Amal Krishna** - [@amalkrishnaks](https://github.com/amalkrishnaks)
