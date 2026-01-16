# Backend – Real-Time Chat Application

This repository contains the **backend service** for a real-time chat application built as a **team project**.

The backend handles **authentication, OAuth 2.0 register & login, real-time messaging, and user presence tracking**, and is deployed on **Render**.

---

## 🚀 Features

- 🔐 User Authentication  
  - Register & Login using JWT  
  - Secure password hashing  

- 🔑 OAuth 2.0 Authentication  
  - Google OAuth 2.0 integration  

- 💬 Real-Time Chat  
  - One-to-one real-time messaging using Socket.IO  

- 🟢 User Presence  
  - Online / Offline status tracking  

- 🧾 Token-based Authorization  
  - Protected routes using JWT  

---

## 🛠 Tech Stack

- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB Atlas  
- **Authentication**:  
  - JWT (JSON Web Tokens)  
  - Google OAuth 2.0  
- **Real-Time Communication**: Socket.IO  
- **Deployment**: Render  

---

## 📂 Project Structure

```

src/
│── config/
│── middleware/
│── modules/
│         │── auth/
│         │── chat/
│         │── socket/
│         │── user/
│
│── utils/
│── server.js
│── app.js

```

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```

MONGO_URL="your-mongo-atlas-connection-string"
PORT=8000

GOOGLE_CLIENT_ID=your-client-id
GOOGLE_REDIRECT_URI="http://localhost:8000/api/auth/google/callback"
GOOGLE_CLIENT_SECRET=your-client-secret

JWT_SECRET="jwt-secret-some-random-string"
JWT_EXPRIRES_IN=7d

FRONTEND_URL="http://localhost:5173"

````

---

## ▶️ Running Locally

```bash
npm install
npm run dev
````

---

## 🌐 Deployment

* Backend hosted on **Render**
* MongoDB hosted on **MongoDB Atlas**

---

## 👥 Team Members

* **Dhiraj Dhande**   
  GitHub: [dhirajdhande19](https://github.com/dhirajdhande19)

* **Avishkar**   
  GitHub: [Avishkar1426](https://github.com/Avishkar1426)

* **Santosh**  
  GitHub: [Sahilganvir123](https://github.com/Sahilganvir123)

---

## 📄 License

This project is for learning and portfolio purposes.
