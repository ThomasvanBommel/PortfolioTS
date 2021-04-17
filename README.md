# PortfolioTS
Typescript portfolio with a ReactJS front-end

This project gets auto-deployed to [vanbommel.ca](https://vanbommel.ca)

## Features
 - Continuous integration
 - Continuous deployment
 - Webpack client code
 - TSC transpiling
 - Express network router
 - React front-end
 - Developer mode (watch files and auto-transpile)
 - Production mode
 - Mocha test suite

## Configuration
Environment variables:
 - **YT_API_KEY**: needs to be set to allow the server to access the YouTube API
 - **NODE_ENV**: will change how the client transpiles
   - "development" will keep comments intact
   - "production" or if it's not set; will remove comments and minify the clients code (takes longer to transpile)
 - **GMAIL_USER**: gmail username / email for the account used to send emails (from the contact form)
 - **GMAIL_PASS**: gmail password for the account used to send emails (from the contact form)

TLS Certificate:
 - Create and store a TLS certificate pair in the `.cert` directory, named `cert.pem` and `privkey.pem`
   - Can be generated with `openssl req -x509 -newkey rsa:4096 -keyout privkey.pem -out cert.pem -days 365 -nodes -subj '/CN=localhost'`

## Available Commands
All commands are run using `npm run <command>`
 - `test`: run test suite
 - `start`: start-up the server
 - `cleanup`: clean-up generated files
 - `watch`: watch client files for changes and auto-transpile (used for client development)

## Requirements
You need the following in order to run this project
 - [NodeJS](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/)

## Run the project
Prerequisite:
 - Configure the server, see [Configuration](##-configuration)
 - Install npm packages with `npm i`

Run in production mode:
 1. Run `npm start`

Run in development mode:
 1. Run `npm start` in one terminal
 2. Run `npm run watch` in another terminal

Run tests:
 1. Run `npm test`