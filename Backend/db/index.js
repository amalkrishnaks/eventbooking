const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL || "mongodb://localhost:27017/Event-Booking-DB-3";

// Enhanced Logging for Debugging
const maskedURL = mongoURL.replace(/:([^:@]{1,})@/, ':****@');
console.log("Attempting to connect to DB:", maskedURL);

mongoose.connect(mongoURL)
    .then(() => console.log("✅ SUCCESS: Connected to MongoDB Atlas!"))
    .catch((err) => {
        console.error("❌ ERROR: Connection failed.");
        console.error("Error Code:", err.code);
        console.error("Error Message:", err.message);
        if (err.message.includes("ECONNREFUSED")) {
            console.error("👉 TIP: Check your MongoDB Atlas 'Network Access' (0.0.0.0/0 must be allowed).");
        }
    });

module.exports = mongoose;