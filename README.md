# Blog Management Application

This project is a full-stack Blog Management application with authentication and CRUD operations.

## Setup Instructions

Follow these steps to set up and run the project locally:

---

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or hosted instance)
- **MySQL** (for relational database tasks)
- **npm** (Node Package Manager)
- **Git** (to clone the repository)

---

### 1. Clone the Repository

git clone https://github.com/your-repo-name.git
cd your-repo-name


# MySQL Database
Navigate to the Database folder in the project:
cd Database

- ## 1. Import the database file:
mysql -u [username] -p [database_name] < database.sql

- ## 2. Replace:
[username] with your MySQL username.
[database_name] with the name of the database you want to create/import into.


- ## 3. Set Up Environment Variables
Copy the .env.example file to .env:
cp .env.example .env
Update the following variables in the .env file:

- MONGO_URI=mongodb://localhost:27017/blogdb
- MYSQL_HOST=localhost
- MYSQL_USER=[your_mysql_username]
- MYSQL_PASSWORD=[your_mysql_password]
- MYSQL_DATABASE=[database_name]
- PORT=5000
- JWT_SECRET=[your_jwt_secret]

- ## 4. Install Dependencies
Run the following command to install all required dependencies:

npm install

- ## 5. Start the Application
Start the server:

npm run dev
Open your browser and navigate to:


http://localhost:5000

- ## 6. Frontend Setup
Ensure the frontend application is set up properly with the backend endpoints in src/api/axios.js or equivalent file.

- ### Endpoints to Modify
Backend API Base URL: Update the base URL in the frontend code if the backend runs on a different host or port:

const BASE_URL = "http://localhost:5000";
