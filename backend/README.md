<h1 align="center">
  TypeScript + Express + Mongoose + MongoDB Exam
</h1>

<h4 align="center">🚀 Express RESTful API with TypeScript and Mongoose Exam</h4>

<br />

## Introduction

## Best Practices Applied
1. Project Structure
2. Error Handling
3. Code Style (ESLint & Prettier)
4. Testing (E2E Testing and Unit Testing)

## Features

- **TypeScript:** for static typing, enhanced code maintainability, and better developer tooling.
- **Express:** Node JS framework.
- **Mongoose:** MongoDB object modeling library.

- **Error Handling:** Implemented a centralized error handling and consistent error responses across your application.
- **Linting and Formatting:** Maintain clean and consistent code with ESLint and Prettier as Code Style Practices.
- **E2E and Unit Testing with Jest:** Unit testing framework.

- **Environment Configuration:** Manage application's configuration using environment variables with the help of the dotenv library.
- **Process Management:** Used PM2 or Nodemon for process management and automatic application restarts during development and production.
- **SWC Compiler:** Utilized SWC compiler for faster TypeScript compilation and improved performance.

- **Docker Integration:** Containerized the application and let you test, deploy, and scale your application into any environment.


## ⚒ How to Install

Go to the backend directory and install the dependencies:

```bash
$ cd backend
$ npm install
```
## Project Setup/Configuration

Before starting the project, make sure to set up the database credentials in the `.env.development` file. Check the contents of  `.env-example` for reference

### Compile and Hot-Reload for Development

```sh
docker-compose up
```
If you dont want to run the docker or you don't have a docker you can use below command but you have to replace the MONGODB_URI with working or live Mongodb Database URI 
```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Compile and Minify for Production with Type Checking

```sh
npm run build:tsc
```

### Run Unit Tests

```sh
npm run test
```

### Run Linting

```sh
npm run lint
```

