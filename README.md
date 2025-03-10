# Optimum URL Shortener

## Environment Variables

Create environment files based on the environment:

- For production, create a `.env` file:
  
  ```env
  NODE_ENV=production
  BE_SERVER_URL=http://localhost:3000

  # Redis Configuration
  REDIS_HOST=
  REDIS_USERNAME=
  REDIS_PORT=
  REDIS_PASSWORD=
  ```

- For development, create a `.env.development.local` file:
  
  ```env
  NODE_ENV=development
  BE_SERVER_URL=http://localhost:3000

  # Redis Configuration
  REDIS_HOST=
  REDIS_USERNAME=
  REDIS_PORT=
  REDIS_PASSWORD=
  ```

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Build the project:
   ```sh
   npm run build
   ```

## Dependencies

The project uses the following dependencies:
- **Express** - Web framework for Node.js
- **TypeScript** - Typed JavaScript
- **Morgan** - HTTP request logger
- **ShortID** - URL shortener utility
- **Redis (ioredis)** - Caching system
- **Pino** - Fast logging library
- **Express Rate Limit** - Basic rate-limiting middleware
- **Axios** - HTTP client
- **EJS** - Embedded JavaScript templating

## Notes
- Ensure that the backend server is running at `http://localhost:3000` before starting the frontend.
- Modify the appropriate environment file (`.env` for production, `.env.development.local` for development) if using a different backend URL.
- Redis must be installed and running if caching is enabled.