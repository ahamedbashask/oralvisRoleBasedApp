# Oralvis Backend


This is the backend server for **Oralvis**, built with **Node.js, Express, SQLite, JWT authentication, and Cloudinary integration**.

---

## 🚀 Features
- User authentication with **JWT**
- Password hashing with **bcryptjs**
- Role-based authorization (**Technician**, **Dentist**)
- Upload scans (images) to **Cloudinary**
- Store scan records in **SQLite**
- Protected routes with role-based access
- CORS enabled for frontend communication

---

## 📦 Tech Stack
- Node.js + Express
- SQLite3
- JWT Authentication
- bcryptjs
- multer (file uploads)
- Cloudinary (image storage)
- CORS

---

## ⚙️ Setup Instructions



### 1. Clone the repository


bash
git clone https://github.com/yourusername/oralvis-backend.git
cd oralvis-backend


## 2.Install dependencies
    - npm install
#


### 3. Setup environment variables
  PORT=4000
  JWT_SECRET=7c3d14fa63e0bc6e579ab938d6ebb29b6e54cb184026f4860cd4cd5b26d7d6c9f032d1514ec732f2def5de29e4fb63e22fb9887812441e6a902d81ab4ac26ef7
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret

### 4. Run db.js file once and run addUser() funtcion

### 5. then start the server by typing node server.js

### 6. then open new terminal and type cd oralvis-frontend

### 7. npm install
### 8. npm run dev

## Credientials to test 
  Dentist {
  email: dentist1@example.com,
  password: securepass456
  }

  Technician {
  email: tech1@example.com,
  password: mypassword123
  }

## Sample Images






<img width="1642" height="1743" alt="Screenshot 2025-09-03 011950" src="https://github.com/user-attachments/assets/23edddb8-6f1a-4cfd-8428-b92899cfe71d" />
<img width="1642" height="1743" alt="Screenshot 2025-09-03 012028" src="https://github.com/user-attachments/assets/f9d3d1ff-013d-4880-96a0-f89e8945ff85" />
<img width="1642" height="1743" alt="Screenshot 2025-09-03 012058" src="https://github.com/user-attachments/assets/71220952-3ba2-446c-ba22-43e4993d1697" />
<img width="1642" height="1743" alt="Screenshot 2025-09-03 012110" src="https://github.com/user-attachments/assets/4db2de65-c30e-45f7-980a-9dd1151c22b6" />
<img width="1642" height="1743" alt="Screenshot 2025-09-03 012148" src="https://github.com/user-attachments/assets/71c8b965-2dcd-4a4f-9f48-775bdc717c6e" />




