***Task Scheduler API***

A Node.js + Express + MongoDB REST API for managing tasks with user authentication (JWT).  
Supports user registration, login, task creation, weather checks, and more.

***Features***

- User authentication with JWT (Register/Login)
- Create, update, delete tasks
- Weather API integration with bad weather detection
- MongoDB (Mongoose) for database
- Proper error handling
- Secure environment variables using `.env`

***Installation***

***Clone the repository:***

git clone https://github.com/vaishnavimirgal/taskSchedular.git

cd taskSchedular

***Install dependencies:***
npm install

***Environment Variables***

Create a .env file in the project root:

PORT=9000

MONGODB_URI=mongodb+srv://vaishnavikate:V%40ishnavi@taskschedular.ibw6rap.mongodb.net/taskdb?retryWrites=true&w=majority&appName=taskSchedular

JWT_SECRET=660b0b86a158613e53d6d46d3112860d88d83094a54d7263cf741146318afa7dc0f05e7ae435df2228acf2b6034df9a02ddec247a24ea60fd5efc5f0194c3aef

OPENWEATHER_API_KEY=06a2574cda33119c564635abdc3e8fae


***API Endpoints***

**Auth**

POST /api/auth/register → Register a new user

POST /api/auth/login → Login and get JWT

**Tasks**

POST /api/tasks → Create a task

GET /api/tasks → Get all tasks for a user

PUT /api/tasks/:id → Update task by ID

DELETE /api/tasks/:id → Delete task (only if pending)

***Tech Stack***

Node.js + Express

MongoDB + Mongoose

JWT Authentication

OpenWeather API for weather data


