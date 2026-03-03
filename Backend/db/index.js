const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL || "mongodb://localhost:27017/Event-Booking-DB-3";

mongoose.connect(mongoURL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.error(err));

module.exports = mongoose;    