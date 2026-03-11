const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// CORS configuration for production
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
const allowedOrigins = allowedOriginsEnv ? allowedOriginsEnv.split(',') : null;

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || !allowedOrigins || allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
            return callback(null, true);
        } else {
            console.error(`🔒 CORS Blocked Origin: ${origin}`);
            return callback(new Error('CORS access denied'), false);
        }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Root route
app.get('/', (req, res) => {
    res.json({ status: 'Online', service: 'Event Hub API' });
});

// Routes
const routes = require('./routes');
app.use('/api', routes);
app.use('/', routes); // Failsafe for incorrect Vercel env variable
// 404 handler
app.use('*', (req, res) => {
    return res.status(404).json({ message: "API Endpoint Not Found" });
});

module.exports = app;
