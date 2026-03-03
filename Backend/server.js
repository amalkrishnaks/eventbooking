const express = require('express');
const cors = require('cors');
const env = require('dotenv/config');
const app = express();
const PORT = process.env.PORT || 4000;

// app.use(cors());

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
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


app.listen(PORT, () => {
  console.log(`app is running @ http://localhost:${PORT}/`);
})