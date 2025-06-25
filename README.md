# HOW I CREATED THE PROJECT

This is the tech stack I used:
- Back-end: Node.js, Express
- Database: PostgreSQL
- Front-end: React.js with Vite
- Style: CSS

This is the design model I used:
The project follows the mvc model, using controllers to store the database queries and routes to make them available for the server at certain endpoints.
The front-end takes care of fetching all the content to perform the get, put, delete or post method.



## BACK-END

### STRUCTURE

controllers =>   contacts.js = Functions to perform CRUD actions on the 'contact' table (that gives life to the contact list you'll see in the frontend)

            =>   companies.js = One single function to get all companies (no further methods are needed on the 'company' table)


database    =>   config.js = Sets a pool connection with a PostgreSQL database


routes      =>   contacts_companies.js  = Defines all routes for the server


postman_doc =>   methods.json = The json export of all the methods called with Postman. Copy the body of this json object in Postman API calls to test if the backend API work


.env        => ignored by GIT, it contains the PostgreSQL connection string


server.js   => the main (and only) express app that starts the server



.gitignore  => Instructions for GIT to ignore the .env

README.md   => This very README.md file


### WORKFLOW TO CREATE THE BACK-END
0. Install all dependencies into package.json
1. Initialize the server.js
2. Add and configure the database connection
2. Add logic to the controllers
3. Add routes
4. Test the routes with Postman

### HOW I TESTED THE BACK-END
I tested the routes with Postman: you can find the json exports at this path: contactlist\backend\postman_test\methods.json

### ERROR HANDLING
2.  THE HTTP STATUS CODES I  USED IN THIS PROJECT:

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

1. Add react front-end  as "frontend"

2. Clean the structure of the proejct
    - Delete unused files and folders
    - Create new folders and files

3. organize src/pages:
    - Home.jsx
    - AddContact.jsx
    - UpdateContact.jsx

4. Add a minimalistic style with CSS:
- I chose not to focus on the style, bacause I needed to concentrate on the back-end logic and on building a solid React front-end using Hooks like UseEffect and UseState. These were my 2 main goals.