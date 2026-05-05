# 🏥 Child Immunisation Tracking System

A React + Firebase web application built using Material Dashboard React to help parents track child vaccinations, receive reminders, and interact with a chatbot assistant.

---

## 🚀 Features

- 👶 Child vaccination tracking system
- 💉 WHO-based immunisation schedule
- 📊 Dashboard overview (health snapshot)
- 🔔 Vaccine reminders system
- 👨‍👩‍👧 Parent & child profiles
- 📅 Calendar view for vaccines
- 🤖 AI Chatbot (Configurator panel)
- ⚙️ Settings & user preferences
- 🔐 Firebase authentication & database

---

## 📦 Dependencies

npm install react react-dom react-scripts  
npm install firebase  
npm install react-router-dom  
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled  
npm install react-calendar  
npm install @fullcalendar/react @fullcalendar/daygrid  
npm install prettier  

---

## 🚀 Run Project

Install dependencies:  
npm install  

Start development server:  
npm start  

App runs at:  
http://localhost:3000  

---

## 🧭 App Pages Structure

🏠 Dashboard (My Overview) — src/layouts/dashboard/  
- Child summary card  
- Upcoming vaccinations  
- Missed alerts  
- Vaccine stats  
- Send reminder  

💉 Vaccine Reminder Page — src/layouts/vaccines/  
- Timeline view  
- Status: Done / Upcoming / Missed  
- Mark done / view details / reminder  

👶 Child Profile Page — src/layouts/child-profile/  
- Parent info  
- Child info  
- Medical history  
- Vaccine history  

🔔 Reminder Center — src/layouts/reminders/  
- Upcoming reminders (2 days before)  
- Missed vaccine alerts  
- Notification history  

📅 Calendar Page — src/layouts/calendar/  
- Vaccine schedule  
- Green = completed  
- Yellow = upcoming  
- Red = missed  

⚙️ Settings Page — src/layouts/settings/  
- Profile settings  
- Notification settings  
- Future language support  

🤖 Chatbot (Configurator Panel) — src/examples/Configurator/  
- Vaccine explanations  
- Missed vaccine guidance  
- System assistant  

---

## 🎨 Code Formatting

After changes in src/:  
npx prettier --write src  

---

## 💉 Firestore Database Structure

Collection: users/{uid}/vaccines  

Example document:  
{  
  name: "BCG",  
  dateOffsetWeeks: 0,  
  status: "Done",  
  note: "At birth"  
}  

---

## 🧭 Navigation Sidebar

- Dashboard  
- Vaccine Reminder  
- Child Profile  
- Reminders  
- Calendar  
- Settings  
- Chatbot  

---

## 📁 Project Structure

material-dashboard-react/  
├── public/  
├── src/  
│   ├── assets/  
│   ├── components/  
│   ├── context/  
│   ├── examples/Configurator/ (ChatBot) 
│   ├── layouts/dashboard/  
│   ├── layouts/vaccines/  
│   ├── layouts/child-profile/  
│   ├── layouts/reminders/  
│   ├── layouts/calendar/  
│   ├── layouts/settings/  
│   ├── firebase.js  
│   ├── routes.js  
│   ├── App.js  
│   └── index.js  
├── package.json  
└── README.md  

---

## 🧠 System Logic

- Vaccines auto-generated from birth date  
- Status system: Done / Upcoming / Missed  
- Dashboard shows health snapshot  
- Reminder system tracks notifications  
- Chatbot assists parents  

---

## 💙 Tech Stack

- React JS  
- Firebase (Auth + Firestore)  
- Material Dashboard React  
- Material UI  
- React Calendar / FullCalendar  
- Prettier