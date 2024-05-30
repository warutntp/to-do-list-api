# Todo List API

This project is a simple Todo List API built with Express.js and TypeScript.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/warutntp/to-do-list-api.git
cd to-do-list-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```
npm run dev
```

4. To run the tests, use the following command:
```bash
npm test
```

## Usage
Once the server is running, you can interact with the API using a tool like Postman or curl.

## API Endpoints
### Get all Todos
- **URL:** `/api/todos`
- **Method:** `GET`
- **Query Parameters:** `completed`(optional, boolean)
- Response: JSON array of todos

```json
    [
        {
            "id": 1,
            "title": "Todo Title",
            "description": "This is a todo description",
            "completed": false
        }
    ]
```

### Get Todo by ID
- **URL:** `/api/todos/:id`
- **Method:** `GET`
- **Response:** JSON object of the requested todo
```json
    {
        "id": 1,
        "title": "Todo Title",
        "description": "This is a todo description",
        "completed": false
    }
```

### Create a Todo
- **URL:** `/api/todos`
- **Method:** `POST`
- **Body:**
```json
    {
        "title": "Todo Title",
        "description": "This is a todo description"
    }
```
- **Response:** JSON object of the created todo
```json
    {
        "id": 2,
        "title": "Todo Title",
        "description": "This is a todo description",
        "completed": false
    }
```

### Update a Todo
- **URL:** `/api/todos/:id`
- **Method:** `PUT`
- **Body:**
```json
    {
        "title": "Updated Todo",
        "description": "This is an updated description",
        "completed": true
    }
```
- **Response:** JSON object of the updated todo
```json
    {
        "id": 1,
        "title": "Updated Todo",
        "description": "This is an updated description",
        "completed": true
    }
```
### Delete a Todo
- **URL:** `/api/todos/:id`
- **Method:** `DELETE`
- **Response:** JSON object of the deleted todo
```json
    {
        "id": 1,
        "title": "Todo Title",
        "description": "This is a todo description",
        "completed": false
    }
```

## Project Structure
```
src
├── api
│   └── todo
│       ├── controller.ts
│       ├── route.ts
│       ├── service.ts
│       ├── type.ts
├── middleware
│   ├── asyncHandler.ts
│   ├── errorHandler.ts
│   ├── logger.ts
│   ├── validators.ts
├── tests
│   └── todo.test.ts
├── utils
│   └── handleError.ts
├── app.ts
├── routes.ts
└── server.ts
```