# Photo/Captions Contest

- A web application to upload photos and accept captions for the photos.

## Table of contents

- Description
- Project objectives
- Technology
- Launch
- Testing with wagger
- How to use
- Source

## Description

- This project satisfy all the requirements of the Portfolio - Photo/Captions Contest of the
  Codecademy's Back-End Engineering path. This was built with node and express, postgres SQL to
  store and retrieve data using ORM Sequelize.

## Project Objectives

- Build an API using Node.js and Express
- Be able to create, read, update, and delete photos
- Be able to create, read, update, delete captions.
- Add functionality to CRUD photos, captions, votes and inscriptions.
- Use Git version control to keep track of your work
- Use Postman to test API endpoints
- Implement a database
- Integrate existing API endpoints with database layer
- Database implementation for users, photos, captions, votes and inscriptions.
- Deploy the app using Heroku
- Create documentation using the Swagger API
- Document the project using JSDoc and Swagger.

## Technology

Project is created with:

- ES6 Javascript
- Node.js
- Express.js
- HTML
- CSS
- ORM Sequelize
- Postgres SQL
- Swagger

## Launch

Download the files and extract them in a folder. To run the server, node must be installed. Run 'npm
install to install', then 'npm start'

Once it is installed run the app locally, API could be accessed at http://localhost:3000/

## Testing with Swagger

Swagger documentation and testing available at http://localhost:3000/api/docs

### users:

- getAllUsers: GET /users
- createUsers: POST /users
- UpdateUsers: PUT /users/:user_id
- deleteUsers: DELETE /users/:user_id

### photos:

- getAllPhotos: GET /photos
- createPhotos: POST /photos
- UpdatePhotos: PUT /photos/:id
- deletePhotos: DELETE /photos/:id

### captions:

- getAllcaptions: GET /captions
- createcaptions: POST /captions
- Updatecaptions: PUT /captions/:id
- deletecaptions: DELETE /captions/:id

### votes:

- getAllvotes: GET /votes
- createvotes: POST /votes
- Updatevotes: PUT /votes/:id
- deletevotes: DELETE /votes/:id

### inscriptions:

- getAllinscriptions: GET /inscriptions
- createinscriptions: POST /inscriptions
- Updateinscriptions: PUT /inscriptions/:id
- deleteinscriptions: DELETE /inscriptions/:id

## How to use

Using Swagger at http://localhost:3000/api/docs you could try all the endpoints to perform CRUD
operations.

## Source

This project was part of the portfolio challenge from the Codecademy's Back-End path.
