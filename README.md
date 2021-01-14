# GovTech NodeJS API Asessment

![Statements](https://img.shields.io/badge/Coverage-99.26%25-brightgreen.svg)

Develop a set of API endpoints for teachers to perform administrative functions for their classes.

## Introduction

This is an asessment from GovTech, more details in https://gist.github.com/d3hiring/4d1415d445033d316c36a56f0953f4ef

## Public API link

Here is the link https://8o4zbsskqi.execute-api.ap-southeast-1.amazonaws.com
You may test the APIs without running locally by using the link above.

## Getting Started

Start by cloning the repository and installing dependencies.

```bash
# Clone the repository
git clone https://github.com/MonkeyD-IchiJou/govtech-nodejs-api.git

# Go inside the directory
cd govtech-nodejs-api/

# Install dependencies
npm install
```

## Running Locally

Make sure you have Node.js version >= `14.13.1` and npm version >= `6.14.8`

Please get the .env file from the main developer, copy and paste the .env file in the project top level directory (.e.g. ./govtech-nodejs-api/.env). This is an important step before running locally. The .env contains the credentials to connect to mysql database. 

After you have meet all the requirements in your local machine, you may run

```bash
npm start
```

And it will listen at `localhost:3000`

## Testing Locally
```bash
# unit testing
npm run test

# integration testing with the public API link https://8o4zbsskqi.execute-api.ap-southeast-1.amazonaws.com
npm run test:integration
```
