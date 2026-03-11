const mongoose = require('mongoose');

const mongoURL = "mongodb://amal:amalat2003@ac-1bsmikc-shard-00-00.uojjvdw.mongodb.net:27017,ac-1bsmikc-shard-00-01.uojjvdw.mongodb.net:27017,ac-1bsmikc-shard-00-02.uojjvdw.mongodb.net:27017/EventBooking?ssl=true&authSource=admin&retryWrites=true&w=majority";

// Enhanced Logging for Debugging
const maskedURL = mongoURL.replace(/:([^:@]{1,})@/, ':****@');
console.log("Attempting to connect to DB:", maskedURL);

mongoose.connect(mongoURL)
    .then(() => console.log("✅ SUCCESS: Connect to MongoDB Atlas!"))
    .catch((err) => {
        console.error("❌ ERROR: Connection failed.");
        console.error("Error Code:", err.code);
        console.error("Error Message:", err.message);
        if (err.message.includes("ECONNREFUSED")) {
            console.error("👉 TIP: Check your MongoDB Atlas 'Network Access' (0.0.0.0/0 must be allowed).");
        }
    });

module.exports = mongoose;