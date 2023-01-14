# Simple-CRUD-API

## Installation

1. `git clone https://github.com/Vanya1000/CRUD-API.git`
2. `git checkout develop`
3. `npm install`
4. rename .env.example to .env

## Running

`npm run start:prod` - run in production mode (starts the build process and then runs the bundled file)
`npm run start:dev` - run in development mode using nodemon
`npm run start:multi` - starts multiple instances application
`npm run test` 6 scenarios tests you can launch
`npm run lint` launch linter
`npm run format` launch prettier

#### Using

| Routes             | HTTP     | Description           |
| ------------------ | -------- | --------------------- |
| **/api/users**     | `GET`    | Get all users         |
| **/api/users/:id** | `GET`    | Get user by id        |
| **/api/users**     | `POST`   | Create a user         |
| **/api/users/:id** | `PUT`    | Update data of a user |
| **/api/users/:id** | `DELETE` | Delete a user         |

##Postman query:

#### POST localhost:4000/api/users

body:

```json
{
  "name": "Name",
  "age": 30,
  "hobbies": ["Reading", "Coding"]
}
```

Response: `201 Created`

```json
{
  "id": "49825951-3ba3-4663-b0c6-649c66e4f26b",
  "name": "Name",
  "age": 30,
  "hobbies": ["Reading", "Coding"]
}
```

#### GET localhost:4000/api/v1/users

Response: `200 OK`

```json
[
  {
    "id": "49825951-3ba3-4663-b0c6-649c66e4f26b",
    "name": "Name",
    "age": 30,
    "hobbies": ["Reading", "Coding"]
  }
]
```

#### GET localhost:4000/api/users/49825951-3ba3-4663-b0c6-649c66e4f26b

Response: `200 OK`

```json
{
  "id": "49825951-3ba3-4663-b0c6-649c66e4f26b",
  "name": "Name",
  "age": 30,
  "hobbies": ["Reading", "Coding"]
}
```

#### PUT localhost:4000/api/users/49825951-3ba3-4663-b0c6-649c66e4f26b

body:

```json
{
  "id": "49825951-3ba3-4663-b0c6-649c66e4f26b",
  "name": "Name",
  "age": 16,
  "hobbies": ["Coding"]
}
```

Response: `200 OK`

```json
{
  "id": "49825951-3ba3-4663-b0c6-649c66e4f26b",
  "name": "Name",
  "age": 16,
  "hobbies": ["Coding"]
}
```

#### DELETE localhost:4000/api/users/49825951-3ba3-4663-b0c6-649c66e4f26b

Response: `204 No Content`

## Invalid uuid

#### GET localhost:4000/api/users/333

Response: `400 Bad Request`

```json
{
  "message": "Invalid id"
}
```

## Not found

#### GET localhost:4000/api/users/e4ca2713-dd70-4011-afb3-ec774c9a03bd

Response: `404 Not Found`

```json
{
  "message": "User not found"
}
```

## Invalid body

#### POST localhost:4000/api/users

body:

```json
{
  "username": "Name",
  "hobbies": ["some", "text"]
}
```

Response: `400 Bad Request`

```json
{
  "message": "Validation failed",
  "errors": ["Property age is required"]
}
```

## Invalid JSON

#### POST localhost:4000/api/users

body:

```
{
    "username": "Name"
    "age": 30
    "hobbies": ["test", "test", "test"]
}
```

Response: `400 Bad Request`

```json
{
  "message": "Invalid JSON"
}
```

## Invalid types

#### POST localhost:4000/api/users

body:

```json
{
  "username": 22,
  "age": "30",
  "hobbies": {}
}
```

Response: `400 Bad Request`

```json
{
  "message": "Validation failed",
  "errors": [
    "Property username should be a string",
    "Property age should be a number",
    "Property hobbies should be an array"
  ]
}
```
