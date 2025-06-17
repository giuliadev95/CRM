# HOW I CREATED THE PROEJCT


## BACKEND

### STRUCTURE

controllers /   contacts.js = Functions to perform CRUD actions on the 'contact' table (that gives life to the contact list you'll see in the frontend)
            /   companies.js = One single function to get all companies (no further methods are needed on the 'company' table)

database    /   config.js = Sets a pool connection with a PostgreSQL database

routes      /   contacts_companies.js  = Defines all routes for the server

postman_doc    /   methods.json = The json export of all the methods called with Postman. Copy the body of this json object in Postman API calls to test if the backend API work

.env     / ignored by GIT, it contains the PostgreSQL connection string

server.js / the main (and only) express app that starts the server

.gitignore / Instructions for GIT to ignore the .env

README.md / This very README.md file

### WORKFLOW TO CREATE THE BACKEND
0. install dependencies in package.json
1. initialize server
2. Cadd and configure the database connection
2. add controllers logic
3. add routes
4. test routes with Postman


### HOW I TESTED THE BACKEND

- I tested the routes with Postman: you can find the json exports at this path: contactlist\backend\postman_test\methods.json


### ERROR HANDLING

2. GUIDE TO HTTP STATUS CODES USED IN THIS PROJECT:

    ERRORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses

    - 400: BAD REQUEST:
    The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    - 404: NOT FOUND:
    The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. 
    - 500: GENERAL INTERNAL SERVER ERROR

    SUCCESS: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
    - 200: OK GET
    - 201: OK POST (ITEM CREATED SUCCESSFULLY)
    - 201: OK PUT (ITEM UPDATED SUCCESSFULLY)




## FRONTEND

1. add react frontend  as "frontend"

2. Clean the structure of the proejct
    - Delete unused files and folders
    - Create new folders and files
2. organize src/components:
    - buttons: add, delete, update a contact
    - Navbar.jsx
    - Table.jsx

3. organize src/pages:
    - Home.jsx
    - AddContact.jsx
    - UpdateContact.jsx


4. Fix Pages WITH NO CSS
    - Home
        LOGIC FIXED: DELETE CONTACT, OPEN 'NEW CONTACT' ROUTE, OPEN 'UPDATE CONTACT' ROUTE
        CLEAN ERROR HANDLING AND COMMENTS
        CLEAN CODE



    - AddContact ROUTE EXISTS
    - UpdateContact ROUTE EXISTS

