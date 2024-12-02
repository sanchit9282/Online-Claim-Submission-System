# Online Claim Submission System

This project is an online claim submission system for motor insurance/protection claims. It allows customers to submit, manage, and track their insurance claims.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [API Documentation](#api-documentation)
3. [Assumptions and Design Decisions](#assumptions-and-design-decisions)
4. [Implemented Features](#implemented-features)
5. [Features Not Implemented](#features-not-implemented)

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm (v6 or later)

### MongoDB Setup

1. Install MongoDB on your system if you haven't already.
2. Start the MongoDB service.
3. Create a new database for this project.

### Project Setup

1. Clone the repository:
```
git clone https://github.com/sanchit9282/Online-Claim-Submission-System.git
cd Online-Claim-Submission-System

```
2. Install dependencies:
```

npm install

```
3. Create a `.env.local` file in the project root and add the following:
```

MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
JWT_SECRET=your_jwt_secret

```
Replace the placeholders with your actual values.

4. Start the development server:
```

npm run dev

```

5. Open your browser and navigate to `http://localhost:3000`.

## API Documentation

### Authentication

#### Register a new user

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
```json
{
 "name": "string",
 "email": "string",
 "password": "string"
}
```

- **Response**:

```json
{
  "token": "string",
  "user": {
    "name": "string",
    "email": "string"
  }
}
```

#### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

- **Response**:

```json
{
  "token": "string",
  "user": {
    "name": "string",
    "email": "string"
  }
}
```

### Claims

#### Submit a new claim

- **URL**: `/api/claims`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:

```json
{
  "vehicleInfo": {
    "make": "string",
    "model": "string",
    "year": "number",
    "registrationNumber": "string"
  },
  "description": "string"
}
```


- **Response**:

```json
{
  "message": "Claim submitted successfully",
  "claimId": "string"
}
```

#### Get all claims for a user

- **URL**: `/api/claims`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:

```json
[
  {
    "_id": "string",
    "vehicleInfo": {
      "make": "string",
      "model": "string",
      "year": "number",
      "registrationNumber": "string"
    },
    "status": "string",
    "createdAt": "string",
    "description": "string"
  }
]
```

## Assumptions and Design Decisions

1. **Authentication**: We used JWT for authentication to maintain stateless authentication and improve scalability.
2. **Database**: MongoDB was chosen for its flexibility with document-based storage, which suits the varying nature of insurance claims.
3. **Frontend Framework**: Next.js was used for its server-side rendering capabilities and easy API route integration.
4. **API Structure**: RESTful API design was implemented for clarity and ease of use.
5. **State Management**: React Context was used for global state management (auth state) to avoid prop drilling and maintain a clean component structure.


## Implemented Features

1. User Registration and Login
2. Claim Submission
3. Claim Management (viewing submitted claims)
4. Basic error handling and form validation
5. Responsive design for mobile and desktop views


## Features Not Implemented

Due to time constraints, the following features could not be fully implemented:

1. **Feedback System**: The feature to allow users to provide feedback on their claim submission experience (Net Promoter Score) was not implemented.
2. **Repair Center Functionality**: Despite multiple attempts, the Repair Center feature is still not functioning correctly. This feature was intended to allow customers to locate nearby vehicle repair centers after their claim is accepted.
3. Document Upload: The ability for users to upload necessary documents for claim verification.
4. Claim Status Updates: Real-time updates on claim status.
5. Appeal Process: The ability for users to appeal rejected claims.
6. Admin Dashboard: A separate interface for admin users to manage and process claims.
7. Comprehensive Testing: While basic testing was done, a full suite of unit and integration tests could not be implemented.


These features would be prioritized in future iterations of the project to provide a more comprehensive and user-friendly claim submission system.

```
