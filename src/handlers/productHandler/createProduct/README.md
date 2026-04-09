#  Hyperlocal Shop Ordering Backend

##  Project Setup Guide

Follow the steps below to set up and run the project locally.

---

##  Database Setup

1. Create a PostgreSQL database:

```
"hyperlocal_shop_ordering_db"
```

2. Create a schema inside the database:

```
"hyperlocal_shop_ordering"
```

---

##  Run Migrations

After cloning the repository, navigate to the project folder and run:

```
npx sequelize-cli db:migrate
```

 This will automatically create all required tables in the database.

---

##  Install Dependencies

Run the following command to install all required packages:

```
npm install
```

---

##  Start the Server

Run the development server using:

```
npm run dev
```

The server will start on the configured port (e.g., http://localhost:5000)

---

## Environment Variables    

Create a `.env` file in the root directory and add:

```
PORT=5000
DB_NAME=hyperlocal_shop_ordering_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
```

---

##  API Testing

You can test APIs using Postman.
Make sure to import the provided Postman collection (if included).

---

##  Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM
* JWT Authentication

---

##  Notes

* Ensure PostgreSQL is running before starting the server.
* Run migrations before starting the application.
* Use proper `.env` configuration to avoid connection issues.

