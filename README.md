# Vehicle Rental Application

A full-stack vehicle rental application built with React, TypeScript, Node.js, and Prisma.

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Node.js backend with Prisma ORM

## Backend Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- PostgreSQL database

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Database Setup

1. Create a `.env` file in the backend directory with your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/vehicle_rental?schema=public"
   ```

2. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

### If You Need to Reset the Database

1. To reset the database (deletes all data):
   ```bash
   npx prisma migrate reset
   ```

### API Documentation with Swagger

This project includes Swagger UI for API documentation. After starting the backend server, you can access the API documentation at:

```
http://localhost:5000/api-docs
```


### Running the Backend

```bash
npm run dev
# or
yarn dev
```

## Frontend Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000  # or your backend URL
```

### Running the Frontend

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Available Scripts (Frontend)

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (irreversible)

## Available Scripts (Backend)

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the application
- `npm start` - Start the production server
- `npx prisma studio` - Open Prisma Studio to view and edit the database

## Troubleshooting

- If you encounter database connection issues, verify your `.env` file has the correct database credentials.
- If Prisma migrations fail, try resetting the database with `npx prisma migrate reset`.
- For frontend issues, try clearing your browser cache or running `npm install` again.

## License

This project is licensed under the MIT License.
