# PortfolioTS
Typescript portfolio with a ReactJS front-end 

This project gets auto-deployed to [vanbommel.ca](http://vanbommel.ca)

## Features
 - Continuous integration
 - Continuous deployment
 - Webpack + TSC transpiling
 - Express network router
 - React front-end
 - Developer mode (watch files and auto-transpile)
 - Production mode
 - Complete test suite

## Technology Stack
Server
 - [Express](https://www.npmjs.com/package/express) - Rounting engine
 - [Mocha](https://www.npmjs.com/package/mocha) - Test framework

Client
 - [React](https://reactjs.org/) - UI framework
 - [webpack](https://webpack.js.org/) - Module bundling

## Requirements
You need the following in order to run this project
 - [NodeJS](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/)

## Run the project
Prerequisite:
 - Set environment variable **YT_API_KEY** to a valid youtube api key
 - Install npm packages with `npm i`

Run in production mode:
 1. Run `npm start`

Run in development mode:
 1. Run `npm start` in one terminal
 2. Run `npm run watch` in another terminal

Run tests:
 1. Run `npm test`