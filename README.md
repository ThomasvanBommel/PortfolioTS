# PortfolioTS
Typescript portfolio with a ReactJS front-end 

## Features
 - Continuous integration testing
 - Webpack + TSC transpiling
 - Express network router
 - Typescript type-checking
 - Developer mode (watch files and auto-transpile)
 - Production modes

## Technology Stack
Server
 - [Express](https://www.npmjs.com/package/express) - Rounting engine

Client
 - [React](https://reactjs.org/) - UI framework
 - [Bootstrap](https://getbootstrap.com/) - HTML styling
 - [webpack](https://webpack.js.org/) - Module bundling

## Requirements
You need the following in order to run this project
 - [NodeJS](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/)

## Run the project
Prerequisite:
 - Set environment variable **YT_API_KEY** to a valid youtube api key

Run in production mode:
 1. Run `npm i && npm start`

Run in development mode:
 1. Run `npm i && npm run build-server && npm start` in one terminal
 2. Run `npm run watch` in another terminal