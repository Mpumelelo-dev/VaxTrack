🏠 1. Dashboard (My Overview)
🎯 Purpose:

Personal home page for the logged-in mother showing a quick summary of her child’s vaccination status.

📌 What it shows:
👶 Child summary card (name, age, next vaccine date, status)
🔜 Upcoming vaccinations (next 2–5 only)
❌ Missed vaccinations (urgent alerts)
📊 Quick stats:
Total vaccines due
Completed vaccines
Missed vaccines
🔔 Key Feature:
Send Reminder button (UI only)
→ Simulates SMS sent to parent
🧠 Meaning:

Gives a quick “health snapshot” of the child.

💉 2. Vaccine Reminder Page (Core Tracking Page)
🎯 Purpose:

Main page for managing all vaccination records.

📌 What it shows:

A full vaccination timeline table:

Vaccine	Due Date	Status	Action
BCG	Jan 10	✅ Done	View
Polio	Feb 20	❌ Missed	Mark Done
DTaP	Mar 10	⏳ Upcoming	Pending
🟢 Status Rules:
✅ Done → vaccination completed
❌ Missed → appointment not attended (after due date)
⏳ Upcoming → not yet due
🔘 Actions:
Mark as Done
Send Reminder (manual SMS trigger)
View details
🧠 Meaning:

Full control and visibility of all vaccination records.

👶 3. Child Profile Page
🎯 Purpose:

Detailed information page for the child and their medical history.

📌 What it shows:
🧍 Parent Information
Parent name
Contact details
Relationship to child
👶 Child Information
Name
Date of birth
Age
Basic notes
💉 Vaccination History Timeline
All vaccines in chronological order
Status per vaccine:
Done
Missed
Upcoming
🧠 Meaning:

A complete profile view combining child + parent + health record.

🔔 4. Reminder Page (Notification Center)
🎯 Purpose:

Manages all SMS reminder activity.

📌 What it shows:
📅 Upcoming reminders (sent 2 days before vaccination)
❌ Missed vaccination alerts (after due date passes)
📤 Manually sent reminders
🔔 Reminder Rules:
Auto reminder → sent 2 days before vaccine date
Missed alert → sent after due date passes
Manual reminder → triggered by user button
🧠 Meaning:

Tracks all communication between system and parent.

📅 5. Calendar Page (Optional Feature)
🎯 Purpose:

Visual representation of vaccination schedule.

📌 What it shows:
Calendar view of all vaccination dates
Color coding:
🟢 Completed
🟡 Upcoming
🔴 Missed
🧠 Meaning:

Helps mothers visually plan upcoming vaccinations.

⚙️ 6. Settings Page (Optional)
🎯 Purpose:

User preferences and system configuration.

📌 What it includes:
Mother profile settings
Notification preferences (SMS ON/OFF concept)
Language settings (future expansion)
🧠 Meaning:

Personalizes the system for each user.

🧭 FINAL NAVIGATION STRUCTURE (SIDEBAR)
🏠 Dashboard (My Overview)
💉 Vaccine Reminder
👶 Child Profile
🔔 Reminders
📅 Calendar (optional)
⚙️ Settings (optional)

this is the layout
material-dashboard-react
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   └── theme
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   │   └── theme-dark
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   ├── components
    │   │   ├── MDAlert
    │   │   ├── MDAvatar
    │   │   ├── MDBadge
    │   │   ├── MDBox
    │   │   ├── MDButton
    │   │   ├── MDInput
    │   │   ├── MDPagination
    │   │   ├── MDProgress
    │   │   ├── MDSnackbar
    │   │   └── MDTypography
    │   ├── context
    │   ├── examples
    │   │   ├── Breadcrumbs
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Configurator
    │   │   ├── Footer
    │   │   ├── Items
    │   │   ├── LayoutContainers
    │   │   ├── Lists
    │   │   ├── Navbars
    │   │   ├── Sidenav
    │   │   ├── Tables
    │   │   └── Timeline
    │   ├── layouts
    │   │   ├── authentication
    │   │   ├── billing
    │   │   ├── dashboard
    │   │   ├── notifications
    │   │   ├── profile
    │   │   ├── rtl
    │   │   └── tables
    │   ├── App.js
    │   ├── index.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE.md
    ├── package.json
    └── README.md
```