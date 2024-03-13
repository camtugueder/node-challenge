# nestjs with authorization challenge

For the given challenge, I've chosen to use NestJS along with some dependencies:

- faker: for creating mock data
- @nestjs/config to handle configuration
- bcrypt to encode passwords
- class-transformer to exclude properties from being send in the response
- joi for simple validation of config parameters
- nest-access-control for access control 
- passport for authentication
- passport-jwt to add jwt
- passport-local to login using user and password
- typeorm as ORM
- typeorm-extension to handle seeding the database

## Setup Instructions

1. Clone the repo.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start database with docker if you want (or set up your own):
   ```bash
    docker-compose up db
    ```
4. Run initial migration to set up tables:
    ```bash
    npm run typeorm:run-migrations
    ```
5.  Seed with an applicant and an admin:
    
    ```bash
    npm run seed
    ```
6.  Start the server locally with:
   ```bash
    nest start
   ```
   Or you can use
   ```bash
    docker-compose up --build
   ```
   To start the server inside docker (and also the db)

# Usage

## API Endpoints

### Applications

#### Create a New Application (APPLICANT)

- **Method**: POST
- **URL**: `/applications`
- **Headers**:
   - Authorization: Bearer `<JWT_TOKEN>`
- **Response**: JSON object representing the newly created application.

#### Get One Application (APPLICANT)
The applicant can see their own applications and will receive an Unauthorized error when trying to view one from a different user. The admin can see all applications.

- **Method**: GET
- **URL**: `/applications/:id`
- **Headers**:
   - Authorization: Bearer `<JWT_TOKEN>`
- **URL Parameters**:
   - `id`: ID of the application
- **Response**: JSON object representing the specified application.

#### Get All Applications (ADMIN)

- **Method**: GET
- **URL**: `/applications`
- **Headers**:
   - Authorization: Bearer `<JWT_TOKEN>`
- **Response**: Array of JSON objects representing all applications.

#### Delete an Application (ADMIN)

- **Method**: DELETE
- **URL**: `/applications/:id`
- **Headers**:
   - Authorization: Bearer `<JWT_TOKEN>`
- **URL Parameters**:
   - `id`: ID of the application to delete
- **Response**: Success or error message.

### Authentication

#### Login

- **Method**: POST
- **URL**: `/auth/login`
- **Body**: JSON object containing `username` and `password`.
- **Response**: `LoginResponseDTO` object which includes JWT token.

#### Register

- **Method**: POST
- **URL**: `/auth/register`
- **Body**: `RegisterRequestDto` object containing user registration information.
- **Response**: `RegisterResponseDTO` object which includes details of the registered user.

## Authentication Guide

### Registration

To register a new user, send a POST request to `/auth/register` with the required information in the body. The required fields are specified in the `RegisterRequestDto`.

Example request body:
```json
{
   "username": "newuser",
   "email": "newuser@example.com",
   "firstName": "John",
   "lastName": "Doe",
   "password": "password123"
}
```
Upon successful registration, the server will respond with the access token.

### Login
To login, send a POST request to /auth/login with your username and password in the request body.

Example request body:

```json
{
"username": "newuser",
"password": "password123"
}
```
If the login is successful, you will receive a response containing a JWT token. This token must be included in the Authorization header as a Bearer token for subsequent requests to secured endpoints.

Example response from register and login endpoints:

```
{ access_token: <JTW_TOKEN> };
```

Example Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

The user should be able to send this token and access the application endpoints.