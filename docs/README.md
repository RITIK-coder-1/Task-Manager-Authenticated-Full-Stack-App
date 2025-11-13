# 🌟 Task&Habit  

A full-stack authenticated task management web app that helps users organize their daily goals, manage habits, and stay productive — all in one place.  

---

## 🚀 Live Demo  

🔗 **Frontend:** [https://task-manager-authenticated.vercel.app/]  
🔗 **Backend API:** [https://task-manager-authenticated-full-stack-app.onrender.com/api/v1/]  

---

## 🧩 Overview  

**Task&Habit** is a fully responsive full-stack web app built using the **MERN stack**.  
Users can register, log in, and manage their daily tasks and habits through an intuitive dashboard.  
It supports secure authentication, dynamic CRUD operations, and cloud-based file management.  

---

## ⚙️ Tech Stack  

### **Frontend:**  
- ⚛️ React   
- 🎨 Tailwind CSS  
- 🧠 Redux Toolkit  

### **Backend:**  
- 🟩 Node.js  
- 🚀 Express.js  

### **Database & Cloud:**  
- 🍃 MongoDB (Mongoose ODM)  
- ☁️ Cloudinary (Image Storage)  
- 📦 Multer (File Uploads)  

### **Authentication:**  
- 🔐 JWT (Access & Refresh Tokens)  

### **Deployment:**  
- 🖥️ Frontend: Vercel  
- 🗄️ Backend: Render  

---

## ✨ Features  

- 🏠 **Home Page** – Register or log in to get started.  
- 📋 **Dashboard** – View all your tasks and create new ones.
- 📋 **Task Details** – Access any specific task, view the details, update or delete it.   
- 👤 **Profile Page** – View and update user details, change password, and upload profile picture.  
- ⚙️ **Account Actions** – Logout or permanently delete account.  
- 💻 **Responsive Design** – Fully optimized for desktop, tablet, and mobile.  

---

## 🔐 Authentication Flow  

- User credentials are validated and JWT tokens are generated.  
- Protected routes ensure only authenticated users can access tasks and profile details.  
- It prevents unauthorized access after token expiration.

---

## 🛠️ Setup & Installation  

Follow these steps to run **Task&Habit** locally on your system 👇  

### Clone the repository and Run these commands
```git clone https://github.com/RITIK-coder-1/Task-Manager-Authenticated-Full-Stack-App.git```
```cd Task-Manager-Authenticated-Full-Stack-App```

### Set up the Client
```cd code/client```
```npm install```
```touch .env```
#### Now add this line to your .env file 👇
``` VITE_API_URL="https://task-manager-authenticated-full-stack-app.onrender.com/api/v1"```
#### Once done, start the client:
```npm run dev```

### Set up the Server
```cd ../server```
```npm install```
```touch .env```
#### Now add these lines to your .env file (Make sure to include the actual values based on your mongodb database and cloudinary cloud)👇
```MONGO_URI=""```
```PORT=3000```
```DB_NAME=""```
```ACCESS_TOKEN_SECRET=""```
```REFRESH_TOKEN_SECRET=""```
```ACCESS_TOKEN_EXPIRY="1h"```
```REFRESH_TOKEN_EXPIRY="10d"```
```CLOUDINARY_CLOUD_NAME=""``` 
```CLOUDINARY_API_KEY=""```
```CLOUDINARY_API_SECRET=""```
```PORT=3000```
#### Once done, start the server:
```npm run dev```

---

## 🧠 Challenges, Learnings & Key Implementations 

Building **Task&Habit** was a deep dive into managing a full-stack application end-to-end.  
Here are some of the major challenges I faced and how I tackled them:  

- 🔗 **Integrating the full stack workflow:**  
  Merged frontend and backend into a single cohesive system, ensuring smooth communication between the client and server through REST APIs.  

- ⚡ **Managing asynchronous global state with Redux Toolkit:**  
  Dealt with async thunks and ensured consistent state updates across components.  

- 🔔 **Action-specific notifications:**  
  Implemented toast updates that trigger independently of global state changes to ensure accurate user feedback for every operation.  

- 🧭 **Nested routing with dynamic URL ID manipulation:**  
  Managed complex routing logic for pages with dynamic parameters and nested layouts in React Router.  

- 🔐 **Authenticating task controllers:**  
  Added middleware for validating users and securing all task-related routes with JWT.  

- 🔁 **Automated navigation flow:**  
  Designed logic to automatically navigate users based on their actions — such as successful login, logout, or task creation.  

- 🧱 **Error handling and stability:**  
  Prevented critical app crashes by catching async errors both in the frontend and backend, displaying fallback UI and messages.

- ☁️ **File Updates:**
  Connected Cloudinary & Multer for real-time image uploads.  

- 💻 **Responsive UI:**  
  Built layouts that adapt perfectly across screens without breaking major UI elements using Tailwind CSS.  

---

## 🖼️ App Preview

### 🏠 Home Page
<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Laptop View</strong></td>
      <td align="center"><strong>Mobile View</strong></td>
    </tr>
    <tr>
      <td><img src="../code/client/src/assets/HomePage (Laptop).png" width="100%" alt="Home Page Laptop View" /></td>
      <td><img src="../code/client/src/assets/HomePage (Mobile).png" width="100%" alt="Home Page Mobile View" /></td>
    </tr>
  </table>
</div>

---

### 📝 Register Page
<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Laptop View</strong></td>
      <td align="center"><strong>Mobile View</strong></td>
    </tr>
    <tr>
      <td><img src="../code/client/src/assets/RegisterPage (Laptop).png" width="100%" alt="Register Page Laptop View" /></td>
      <td><img src="../code/client/src/assets/Register (Mobile).png" width="100%" alt="Register Page Mobile View" /></td>
    </tr>
  </table>
</div>

---

### 🔐 Login Page
<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Laptop View</strong></td>
      <td align="center"><strong>Mobile View</strong></td>
    </tr>
    <tr>
      <td><img src="../code/client/src/assets/LoginPage (Laptop).png" width="100%" alt="Login Page Laptop View" /></td>
      <td><img src="../code/client/src/assets/Login (Mobile).png" width="100%" alt="Login Page Mobile View" /></td>
    </tr>
  </table>
</div>

---

### 📋 Dashboard
<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Laptop View</strong></td>
      <td align="center"><strong>Mobile View</strong></td>
    </tr>
    <tr>
      <td><img src="../code/client/src/assets/Dashboard (Laptop).png" width="100%" alt="Dashboard Laptop View" /></td>
      <td><img src="../code/client/src/assets/Dashboard (Mobile).png" width="100%" alt="Dashboard Mobile View" /></td>
    </tr>
  </table>
</div>

---

### 👤 Profile Page
<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Laptop View</strong></td>
      <td align="center"><strong>Mobile View</strong></td>
    </tr>
    <tr>
      <td><img src="../code/client/src/assets/Profile (Laptop).png" width="100%" alt="Profile Page Laptop View" /></td>
      <td><img src="../code/client/src/assets/Profile (Mobile).png" width="100%" alt="Profile Page Mobile View" /></td>
    </tr>
  </table>
</div>

---

### 🗂️ Task Details
<div align="center">
  <table>
    <tr>
      <td align="center"><strong>Laptop View</strong></td>
      <td align="center"><strong>Mobile View</strong></td>
    </tr>
    <tr>
      <td><img src="../code/client/src/assets/TaskDetails (Laptop).png" width="100%" alt="Task Details Laptop View" /></td>
      <td><img src="../code/client/src/assets/TaskDetails (Mobile).png" width="100%" alt="Task Details Mobile View" /></td>
    </tr>
  </table>
</div>

---

## 🎥 Demo Video  

Check out the full walkthrough of **Task&Habit** in action 👇  

https://github.com/RITIK-coder-1/Task-Manager-Authenticated-Full-Stack-App/tree/main/code/client/src/assets/Task&Habit.mp4

---

## 🙌 Author  

**Ritik Mahapatra**  
🎯 Full Stack Web Application Developer  

- 💼 [GitHub](https://github.com/RITIK-coder-1)
- 💼 [LinkedIn](https://www.linkedin.com/in/ritik-mahapatra/)
- ✉️ [Email](mailto:ritikprofessional111@gmail.com)

