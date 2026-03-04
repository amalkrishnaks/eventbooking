const mongoose = require('mongoose');
const url = "mongodb+srv://amal2003:amalat2003@cluster0.t3bw4sz.mongodb.net/event_db?retryWrites=true&w=majority";

console.log("Testing connection to:", url);

mongoose.connect(url)
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ FAILED: Could not connect to Atlas.");
        console.error("Error details:", err.message);
        process.exit(1);
    });
