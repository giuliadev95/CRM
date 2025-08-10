import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect to configured routes without refreshing the page thanks to SPA
import { AiTwotoneDelete } from "react-icons/ai"; // bin icon to delete a contact
import { FaPen } from "react-icons/fa"; // pen to update a contact
import { IoSearchOutline } from "react-icons/io5"; // search lens icon
import { FaUser } from "react-icons/fa"; // user icon
import "../styles/index.css";

const Fetch = () => {
    // Store all contacts fetched from the PostgreSQL database 
    const [ contacts, setContacts ] = useState([]);

    // Store the search input value and handles the input change
    const [input, setInput] = useState("");

    // Hooks the redirecting useNavigate functionalities to the "navigate" variable
    const navigate = useNavigate();

    
    useEffect(()=> {

        // Fetch all contacts from the backend when the DOM mounts
        fetch("http://localhost:3000/api/contacts/get")
        .then ( (response) => response.json() )
        .then( (data) => {

            // The fetched data update the content of the contact variable. This happens even after the deletion of a single contact.
            setContacts(data);

            // OUTPUT EXPECTED: [ { array of objects fetched from localhost:3000/api } ] , object
            console.log(data, typeof data);
       })
       .catch((err) => console.error(`There was an error fetching contacts: ${err}`));
    },[]);
    
    
    // Contacts filtered by the "Search" bar
    const filteredContacts = contacts.filter((contact) => {
        return (
            contact &&
            contact.name &&
            contact.name.toLowerCase().includes(input.toLowerCase())
        );
    });

    // Delete function
    function deleteContact(id) {
        if (!id) return console.error("The ID is missing to perform the deletion.");
    
        fetch(`http://localhost:3000/api/contact/delete/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Error during the deletion.");
            console.log(`Contact with ID: ${id} deleted successfully.`);
            // Avoid mapping and filtering the deleted contact, as its ID will be missing.
            setContacts(contacts.filter((contact) => contact.id_contact !== id));
        })
        .catch((err) => console.error(`Error: ${err}`));
    }

    // Open the page to create a new contact
    function openForm() {
        navigate("/new-contact")
    }

    // Open the page to update the contact
    const openContactPage = (id) => {
        navigate(`update-contact/${id}`);
    }
    
    
    // return:
    return (
        <div className="mt-[20px]"> 
        <h1 className="text-red-500">Test colors</h1>
            <div className="flex flex-col justify-center items-center">
                <div className="flex">
                {/* Searchbar*/}
                <input className="min-w-fit"
                    type='text' 
                    placeholder='Search'
                    value = {input}
                    onChange = {(e) => setInput(e.target.value)}
                />   
                <IoSearchOutline />

                </div>
                {/* Button to add a new contact */}
                <button 
                    type="button"
                    onClick={ ()=> openForm()}
                    >
                    +
                </button>
            </div>

            {/* Contact list table */}
            <div>
                    {/* Map the fetched contacts to display each of them in a table row */}
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact) => (  
                            <ul key={contact.id_contact}>
                                <FaUser/>
                                <li> {contact.name}</li>
                                <li>{contact.email}</li>
                                <li>{contact.role}</li>
                                <li>{contact.company_name || "-"}</li>
                                <li class="actions-button-container"> 

                                    {/* Delete button that calls the delete function */}
                                    <button
                                    type="button"
                                    class="actions-button"
                                    onClick={ ()=> deleteContact(contact.id_contact) }
                                    >
                                    <AiTwotoneDelete/>
                                    </button>   

                                    {/* Update button that calls the update function */}
                                    <button
                                    type="button"
                                    class="actions-button"
                                    onClick={ ()=> openContactPage(contact.id_contact) }
                                    >
                                    <FaPen/>
                                    </button>         
                                </li>      
                            </ul>
                        ))
                    ) : (
                        <p>No matching results</p>
                    )}      
            </div>
        </div>
    );
};

export default Fetch;