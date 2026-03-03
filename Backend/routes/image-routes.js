const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// 1. Configure Cloudinary with your credentials from .env
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Set up Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'event-bookings', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // Optional: resize images
    },
});

const upload = multer({ storage: storage });

// 3. Upload Route with better error catching
router.post('/upload', (req, res) => {
    upload.single('avatar')(req, res, (err) => {
        if (err) {
            console.error("Cloudinary upload error:", err);
            return res.status(500).json({
                success: false,
                message: "Cloudinary upload failed",
                error: err.message || err
            });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        res.status(200).json({
            success: true,
            url: req.file.path,
            public_id: req.file.filename
        });
    });
});

module.exports = router;
