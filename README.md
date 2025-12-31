#  MERN Pastebin-like Chat App

This is a web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that allows users to create, share, and view text snippets (pastes) online. It combines the simplicity of Pastebin with optional chat features for real-time communication.

---

## Features
- **Create & Share Pastes:** Quickly create text snippets and share them via unique URLs.  
- **Optional Expiration & View Limits:** Set a time limit or maximum number of views for each paste.  
- **User Authentication:** Secure signup and login system.  
- **Real-time Chat (Optional):** Chat with other users within the platform.  
- **Responsive Design:** Mobile-friendly interface built with React.js and Tailwind CSS.  

---

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Deployment:** Vercel (frontend), Render (backend)  

---

## Installation & Setup
1.Clone the repository
git clone https://github.com/Rahul-mahato963/mernpastebin.git

2.Backend Setup:
cd backend
npm install

Create a .env file in backend/ and add:
MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the server:
npm run dev

3.Frontend Setup:
cd frontend
npm install

Start frontend
npm run dev


** Live Link**
https://mernpastebin-production.onrender.com/
