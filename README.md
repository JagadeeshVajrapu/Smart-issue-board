
Assignment Explanation

1. Why did you choose the frontend stack you used?

  I chose **React with JavaScript and Vite** for the frontend because it helps in building user interfaces quickly and cleanly. React’s component-based structure made it easy to manage different parts of the UI like authentication, issue creation, and issue listing. Vite provides a fast development environment, which helped me save time and focus more on implementing the required features. I used JavaScript instead of TypeScript to avoid extra complexity and stay aligned with the assignment’s goal of keeping the solution simple.

2. Explain your Firestore data structure.

 I used a single Firestore collection called `issues`, where each document represents one issue. Every issue stores details such as title, description, priority, status, assignedTo, createdBy, and createdAt. This structure is easy to understand and closely matches how issues are tracked in real-world applications. It also makes filtering and sorting straightforward without needing complex database relationships.


3. Explain how you handled similar issues.

  When a user creates a new issue, the application checks the existing issue titles to see if a similar issue already exists. If a possible match is found, the user is shown a warning message before creating the issue. The user can then decide whether to continue or cancel. This approach helps reduce duplicate issues while keeping the logic simple and practical, without over-engineering the solution.


4. Mention what was confusing or challenging.

  One of the confusing parts was deciding how to handle similar issues because the assignment allowed flexibility and did not define a single correct approach. Setting up Firebase Authentication and Firestore rules correctly also required careful attention. Additionally, handling some Windows-specific Git issues during setup was a challenging but valuable learning experience.


5. Mention what you would improve next based on this.

  If I had more time, I would improve the similarity detection logic to be more accurate, add pagination for handling a large number of issues, and introduce role-based access such as admin and user roles. I would also enhance the UI and add real-time updates using Firestore to make the application more interactive.
  

# 🧠 Smart Issue Board

Smart Issue Board is a simple and practical issue-tracking web application built as part of an internship assignment.  
The application allows users to create, manage, and track issues with priorities, statuses, and validation rules.  
The focus of this project is on real-world problem solving, clean architecture, and the ability to justify technical decisions rather than over-engineering.

---

## 🚀 Live Demo
https://smart-issue-board-jade.vercel.app

---

## 🛠️ Tech Stack

### Frontend
- React (JavaScript)
- Vite
- Basic CSS

### Backend & Database
- Firebase Authentication (Email & Password)
- Firebase Firestore

### Hosting & Tools
- Vercel for deployment
- GitHub for code hosting
- AI tools (Cursor) were used for frontend scaffolding, with full understanding and manual backend integration

---

## 🔐 Authentication

- Users can sign up and log in using email and password
- Firebase Authentication handles user sessions securely
- The logged-in user’s email is displayed in the header
- Unauthenticated users are redirected to the login page

---

## 📝 Core Features

### Create Issue
Users can create an issue with the following fields:
- Title
- Description
- Priority (Low / Medium / High)
- Status (Open / In Progress / Done)
- Assigned To (email or name)

Automatically handled by backend:
- Created Time (Firestore server timestamp)
- Created By (logged-in user email)

---

### Issue List
- Displays all issues stored in Firestore
- Default sorting is newest issues first
- Each issue shows title, priority, status, assigned user, and created time

---

### Filters
- Issues can be filtered by Status
- Issues can be filtered by Priority
- Filtering is handled on the client side for simplicity

---

### Similar Issue Handling
When creating a new issue, the application checks existing issue titles.  
If a similar issue already exists, a warning message is shown to the user.  
The user can then choose to continue creating the issue or cancel.

This approach helps reduce duplicate issues while keeping the logic simple and practical.

---

### Status Transition Rule
To maintain a logical workflow:
- ❌ An issue cannot move directly from **Open** to **Done**
- ✅ Valid flow:


