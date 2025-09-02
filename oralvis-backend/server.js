require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const cloudinary = require('cloudinary').v2;
const db = new sqlite3.Database('./oralvis.db');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(cors());
app.use(express.json());



const storage = multer.memoryStorage();
const upload = multer({ storage });



function authenticateJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // console.log(err)
        if (err) return res.sendStatus(403);
        req.user = user;
        // console.log("authHeader")
        next();
    });
}


function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.sendStatus(403);
        next();
    };
}

app.get('/test', (req, res) => {
    res.send("hello world");
})

app.post('/oralvis/login', (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
        // res.send(user)

        bcrypt.compare(password, user.password_hash, (err, valid) => {
            if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

            //JWT token with user details
            const token = jwt.sign(
                { id: user.id, role: user.role, name: user.name, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );
            res.json({ token });
        });
    });
});


app.post('/oralvis/scans/upload',
    authenticateJWT,
    requireRole('Technician'),
    upload.single('image'),
    async (req, res) => {
        try {
            // console.log(req.file)
            const { patient_name, patient_id, scan_type, region } = req.body;
            const imageBuffer = req.file.buffer;
            // console.log(imageBuffer)

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (err, image) => {
                    if (err) return res.status(500).json({ error: 'Cloudinary upload failed' });

                    // Insert scan record into DB
                    // console.log(image.secure_url)
                    db.run(
                        `INSERT INTO scans (patient_name, patient_id, scan_type, region, image_url, uploaded_by, uploaded_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [patient_name, patient_id, scan_type, region, image.secure_url, req.user.id, new Date().toISOString()],
                        function (err) {
                            if (err) return res.status(500).json({ error: 'Database error' });
                            res.json({ id: this.lastID });
                        }
                    );
                }
            ).end(imageBuffer);
        } catch {

            res.status(500).json({ error: 'Upload failed' });
        }
    }
);


app.get('/oralvis/scans',
    authenticateJWT,
    requireRole('Dentist'),
    (req, res) => {
        db.all('SELECT * FROM scans', (err, rows) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json(rows);
        });
    }
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



