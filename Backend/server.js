const express = require('express');
const cors = require('cors');
const env = require('dotenv/config');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const PORT = process.env.PORT || 4000;

// app.use(cors());

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS;
const allowedOrigins = allowedOriginsEnv ? allowedOriginsEnv.split(',') : null;

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // If no restricted origins set, allow all
    if (!allowedOrigins) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      return callback(null, true);
    } else {
      console.error(`🔒 CORS Blocked Origin: ${origin}`);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.static('public'));

require('./db');

const routes = require('./routes');
app.use('/api', routes);



app.use('*', (req, res) => {
  return res.status(404).json({ message: "No Page Found" });
})

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('⚡ User connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`app is running @ http://localhost:${PORT}/`);
})