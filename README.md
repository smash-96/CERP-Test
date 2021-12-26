# CERP-Test - TODO List

## Introduction

The application is a todo list application. Its Frontend is build with **React** and **Typescript**. The stylig is done using **Tailwind CSS**.

The backend is written in **Node JS**. The database used is **PostgreSql**.

The prject has two main folders:

- Backend
- Frontend

## Steps to run Application:

Clone the git repository

### Steps to run Backend:

- Download and install postgrSql and create a database of your choice.
- Navigate to the Backend folder
- create a .env file in this folder.
- In this file, add values for the following variables:
  - PORT=
  - PG_USER=
  - PG_PASSWORD=
  - PG_HOST=
  - PG_PORT=
  - PG_DATABASE=
- The above values would be provided to you during your postgreSql installation and setup.
- Open a terminal in the Backend folder and run the command "npm install".
- After this, run "npm start".
- Your Backend server is now up and running to receive api calls from front end.

### Steps to run Frontend:

- Navigate to the Frontend/cerp-test folder.
- create a .env file in this folder.
- In this file, add values for the variable "REACT_APP_URL_PATH=http://localhost:8080". You can provide the port number on which your database is running.
- Open a terminal in the Frontend/cerp-test folder and run the command "npm install".
- After this, run "npm start".
- Your Frontend is now up and running to interact with the backend.

## API Routes:

1. Create List

   - parameters: List Name
   - request type: post
   - api: /create-list

2. Get all Lists

   - parameters: None
   - request type: get
   - api: /get-lists

3. Update List

   - parameters: List Name or Archived/UnArchived?
   - request type: patch
   - api: /update-list/:listId

4. Add Item to list

   - parameters: Item Name
   - request type: post
   - api: /add-item/:listId

5. Get all items of a list

   - parameters: None
   - request type: get
   - api: /list-items/:listId

6. Update Item of a list
   - parameters: Item Name or Completed/Uncompleted?
   - request type: patch
   - api: /list-items/:listId/item/:itemId

## Notes:

- The first page of page show the available lists.
- These lists can be added, edited, archived, and unarchived.
- We can click on the right double arrow to navigate to the items of a specific list.
- The items of a list can be added, edited, marked completed/uncompleted.
- The count of uncompleted todos are displayed at the bottom.
