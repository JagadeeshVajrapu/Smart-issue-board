Assignment Explanation

1. Why did you choose the frontend stack you used?
   I chose **React with JavaScript and Vite** for the frontend because it helps in building user interfaces quickly and cleanly. React’s component-based structure made it easy to manage different parts of the UI like authentication, issue creation, and issue listing. Vite provides a fast development environment, which helped me save time and focus more on implementing the required features. I used JavaScript instead of TypeScript to avoid extra complexity and stay aligned with the assignment’s goal of keeping the solution simple.

2. Explain your Firestore data structure.
   I used a single Firestore collection called `issues`, where each document represents one issue. Every issue stores details such as title, description, priority, status, assignedTo, createdBy, and createdAt. This structure is easy to understand and closely matches how issues are tracked in real-world applications. It also makes filtering and sorting straightforward without needing complex database relationships.


3. Explain how you handled similar issues
  When a user creates a new issue, the application checks the existing issue titles to see if a similar issue already exists. If a possible match is found, the user is shown a warning message before creating the issue. The user can then decide whether to continue or cancel. This approach helps reduce duplicate issues while keeping the logic simple and practical, without over-engineering the solution.


4. Mention what was confusing or challenging
  One of the confusing parts was deciding how to handle similar issues because the assignment allowed flexibility and did not define a single correct approach. Setting up Firebase Authentication and Firestore rules correctly also required careful attention. Additionally, handling some Windows-specific Git issues during setup was a challenging but valuable learning experience.


5. Mention what you would improve next based on this
  If I had more time, I would improve the similarity detection logic to be more accurate, add pagination for handling a large number of issues, and introduce role-based access such as admin and user roles. I would also enhance the UI and add real-time updates using Firestore to make the application more interactive.

