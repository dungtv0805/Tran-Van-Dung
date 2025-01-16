# Backend Service with ExpressJS and TypeScript

This project is a backend service built with **ExpressJS** and **TypeScript** that provides a CRUD interface for interacting with resources. The service is connected to a simple database for data persistence.

---

## Features

1. **Create Resource**: Add a new resource to the database.
2. **List Resources**: Retrieve a list of resources with basic filtering options.
3. **Get Resource Details**: Retrieve detailed information about a specific resource.
4. **Update Resource**: Modify details of an existing resource.
5. **Delete Resource**: Remove a resource from the database.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: Version 16 or higher
- **npm** or **yarn**: For dependency management

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:dungtv0805/Tran-Van-Dung.git
cd  ./Tran-Van-Dung/problem5
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```
# App's running port
PORT="4040"

# Max request body size
APP_MAX_UPLOAD_LIMIT="50mb"

# Max Parameter Limit that are allowed in
# URL-encoded data
APP_MAX_PARAMETER_LIMIT="5000"

# Is CORS Enabled
# default: true (Accepts only boolean)
CORS_ENABLED=true

# API Prefix
API_PREFIX="api"

# JSON Web Tokem Expiry time
# Note: In minutes
JWT_EXPIRES_IN=3

# Enable Queue Monitor Server
QUEUE_HTTP_ENABLED=true

# QUEUE Monitor's HTTP Port
# Note: This value is required iff QUEUE_HTTP_ENABLED is true
QUEUE_HTTP_PORT=5550

# Local database info
LOCAL_DATA_PATH=./local-db/problem5
LOCAL_DATA_NAME=problem5
```

## Development

### Run the Application

To start the server in development mode:

```bash
npm run start
```

### Run the Application in Production

To build and start the application:

```bash
npm run build
npm start
```

---

## API Endpoints

### 1. Create Resource

**POST** `/resources`

**Request Body**:

```json
{
  "name": "string",
  "description": "string",
  "status": "string"
}
```

### 2. List Resources

**GET** `/resources`

**Query Parameters**:

- `name` (optional): Filter by name
- `status` (optional): Filter by status

### 3. Get Resource Details

**GET** `/resources/:id`

### 4. Update Resource

**PUT** `/resources/:id`

**Request Body**:

```json
{
  "name": "string",
  "description": "string",
  "status": "string"
}
```

### 5. Delete Resource

**DELETE** `/resources/:id`

---

## Scripts

- **`npm run dev`**: Run the development server with hot reloading.
- **`npm run build`**: Build the project for production.
- **`npm start`**: Start the production server.

---

## Project Structure

```
.
├── src
│   ├── controllers       # Route handlers
│   ├── entities          # Database entities
│   ├── exceptions        # Exception handler
│   ├── middlewares       # App middlewares (cors, http, log,...)
│   ├── providers         # App providers (cache, database, passport, routes,...)
│   ├── routes            # API routes definitions
│   ├── services          # Business logic
│   ├── utils             # Utility functions
│   └── main.ts           # Entry point of the application
├── dist                  # Compiled JavaScript files
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── .env                  # Environment variables
```

---

## License

This project is licensed under the MIT License.
