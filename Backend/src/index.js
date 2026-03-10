require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const mongoose = require('./config/db');

// Server starting port
const PORT = process.env.PORT || 4000;

// Create HTTP server via express app
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust origins in production if necessary
        methods: ["GET", "POST"]
    }
});

// Set Socket.io instance on express app globally
app.set('io', io);

io.on('connection', (socket) => {
    console.log('⚡ Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('❌ Client disconnected');
    });
});

// Start the server only after ensuring DB connection or simply listening
server.listen(PORT, () => {
    console.log(`🚀 Production server is running @ http://localhost:${PORT}/`);
    console.log(`🔌 API Gateway: http://localhost:${PORT}/api/`);
});

// Catch unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error(`💥 Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
    console.info('💨 SIGTERM received. Shutting down gracefully.');
    server.close();
});
