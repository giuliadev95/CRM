# HOW I CREATED THE PROEJCT


## BACKEND

0. install dependencies in package.json
1. initialize server
2. add controllers logic
3. add routes
4. test routes with Postman


### HOW I TESTED IT

- I tested the routes with Postman: you can find the json exports at this path: contactlist\backend\postman_test\contactlist project.postman_collection.json

- I'm implementing the Unit tests with Jest, while learning how to use this tool.


### ERRORS

2. CHECK THE ERRORS STATUS CODE. GUIDE:

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

### FURTHER IMPLEMENTATIONS



## FRONTEND
1. add react frontend call it "frontend"
2. organize src/components
3. organize src/pages

