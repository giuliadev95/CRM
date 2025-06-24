import express from "express";
import contacts_routes from "./routes/contacts_companies.js";
import cors from 'cors';

const app = express(); 
const port = "3000";
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.status(200).send({msg:"This is the main get directory at port 3000"});
});

// THIS IS THE " /api " prefix, that is pute before any path of the family "contacts_routes"
app.use('/api', contacts_routes); // = Every time in routes/users.js I
// invoke the router. class, I'm actually requesting a response 
// from: " http://localhost:5000/api/ + costum paths..."
// This is important as it sets the different between the
// app.get() method that listens on port http://localhost.3000/,
// and the router.get() method that listens on port http://localhost:5000/api/

// Error page
app.get('/*', (req, res)=>{
    res.send("404: Page Not Found");
});

// Server listen at port 5000
app.listen(port, ()=> {
    console.log(`Server listening at http://localhost:${port}`);   
});