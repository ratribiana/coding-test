# Development Challenge

Frontend
React + Typescript + Vite + Redux + Redux ToolKit

Backend
Node + TypeScript + Express + Mongoose + MongoDB

## 😎 Introduction

Changes I made in Backend

- I installed latest packages and install TypeScript for static typing, enhanced code maintainability, and better developer tooling.
- I used onion architecture for the separation of concerns
- Best Practices Applied and I updated the Project Structure
- I used SWC as a replacement transcompiler for babel so it will convert lower versions ECMA script into a backwards compatible version of JavaScript 
- I added Docker so the code can run in any machine and the MongoDB can access without installing in local machine/
- I separated the routes, Interfaces, Model and Schema, database connection and controller for code readability
- I replaced body-parser with express.urlencode. We don't need to use separate package for it since it based on Node's body-parser
- I added Error Handling, Linting and Formatting, Environment Configuration, Docker Integration, SWC Compiler and Testing with Jest
- I added Prettier for code maintainability and readability
- I used base64 to decode and encode MongoDB Id for potential security issues. We usually don't expose ids when fetching, updating and deleting data so we need to encrypt it
- I replaced the _id to just id so the database can't be guessed by the hackers or other developers and to maintain the codebase standards.
- I added the tags as optional in UserProfile interface

Changes I made in Frontend

- I updated the Project Structure
- I used Vite for development server because it is faster and optimized 
- I Linting and Formatting, Environment Configuration
- I added redux and redux and RTK (Redux ToolKit) for state management. Redux toolkit simplifies most Redux tasks and prevents common mistakes
- I added TailwindCSS (for styling) because it is a utility-first CSS framework packed with classes which I can directly add to React components/HTML elements
- I created 3 components for Task 1: User Profiles (UserProfileForm and UserProfileManagement) and Task 2: Data table (DataComponent) that can be found in components directory
- The first error error I found in React App.tsx is the use of runningTotal
```sh
let runningTotal = 0;
```
- I totally removed it because the runningTotal inside the reduce cant reach the initialization. it is something releted to JavaScript Closure or Scope
```sh
  const total = (() => {
    let runningTotal = 0;
    dataItems
      .map((item) => item.number)
      .reduce((a, b) => {
        runningTotal += b;
      }, 0);
  })();
```
- The next one is I removed the setDataItems since it is currently not in used in the app and then I successfully run it
- I totally changed the form submission and table using react redux and redux toolkit which includes fetching from API and adding to API
- When it comes to Data table, I made it paginated since it is a long list (1000 items). I added paginaton and limit per page. 
- I separated the total per page and the grand total (number column)
- I updated the search/filtering function
- I replaced the _id to just id so the database can't be guessed by the hackers or other developers and to maintain the codebase standards.
- I added the tags as optional in UserProfile interface


What I am showcasing here is a I can maintain and fix other codebase and I can create a full-stack application based on requirements with different tooling, environments and testing.

Note: Please Read README.md inside subdirectories for best practices and features

## ⚒ How to Install

Clone the repo:

```bash
$ git clone --depth 1 git@github.com:ratribiana/coding-test.git
$ cd coding-test
```

Go to the backend directory and install the dependencies:

```bash
$ cd backend
$ npm install
```
Note: Disregard the error in husky (postinstall), that will run after the full install is finish. It is used for linting commit messages, running tests, linting code, etc... when committing or pushing code to repo

Go to the frontend directory and install the dependencies: 

```bash
$ cd frontend
$ npm install
```

## Project Setup/Configuration

Make sure to copy the `.env.example`/`.env-example` or rename them to `.env.development` or `.env` in each sub directories (backend/frontend).

Note: Env files are not supposed to push in repo but for this case I used `.env.example` and `.env-example` to put the database URI

## Run the BACKEND

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



## Run the FRONTEND

### Compile and Hot-Reload for Development

```bash
$ cd frontend
$ npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Linting

```sh
npm run lint
```


### Run Preview to check the build

```sh
npm run preview
```

### You can connect to database using MongoDB Compass Community Edition in your local after running docker-compose up
```sh
 mongodb://localhost:27017/
```



















### All of the instructions can be found in each directory

