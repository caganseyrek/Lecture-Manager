# Lecture Manager

A full-stack lecture manager app with a frontend built using React and a backend made with Express and MongoDB. (Collectively known as MERN Stack)

The documentation for this projects is available [here](https://caganseyrek.github.io/repos/lecture-manager)

>Warning: This projects is currently incomplete.

***

## Installation and Setup

 1. First, install or clone the project:
    ```bash
    git clone https://github.com/caganseyrek/Lecture-Manager.git
    cd Lecture-Manager
    ```

 2. Then create an .env file for backend. You can use the `template.env` file for a starting point.

    For locally hosting the project, you can set `APISERVER_PORT` to `3000`, `AUTHSERVER_PORT` to `4000` and `FRONTEND_URL` to localhost.
    For randomly generating a key for `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` you can use the following commands:
    ```bash
    node
    require('crypto').randomBytes(64).toString('hex')
    ```

***

## Starting the Servers

 1. For frontend, you can use the following command to start the development build:
    ```bash
    npm run dev
    ```

 2. For backend, you can use following commands to start the api and the auth servers:
    ```bash
    npm run startapi
    npm run startauth
    ``` 
