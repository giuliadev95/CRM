import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect to configured routes without refreshing the page thanks to SPA
import { AiTwotoneDelete } from "react-icons/ai"; // bin icon to delete a contact
import { FaPen } from "react-icons/fa"; // pen to update a contact

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
        <>   
        <div>
        {/* Searchbar*/}
        <input 
                type='text' 
                placeholder='Search'
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
            />   
        {/* Button to add a new contact */}
        <button 
            type="button"
            onClick={ ()=> openForm()}
            >
            + New
        </button>
        </div>
        {/* Contact list table */}
        <table>
            <thead>
                <tr>
                    <th scope="col"> Name </th>
                    <th scope="col"> Email </th>
                    <th scope="col"> Role</th>
                    <th scope="col"> Company</th>
                    <th scope="col"> Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* Map the fetched contacts to display each of them in a table row */}
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (  
                        <tr key={contact.id_contact}>
                            <td> {contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.role}</td>
                            <td>{contact.company_name || "-"}</td>

                            <td> 

                                {/* Delete button that calls the delete function */}
                                <button
                                type="button"
                                id="delete"
                                onClick={ ()=> deleteContact(contact.id_contact) }
                                >
                                <AiTwotoneDelete/>
                                </button>   

                                {/* Update button that calls the update function */}
                                <button
                                type="button"
                                id="update"
                                onClick={ ()=> openContactPage(contact.id_contact) }
                                >
                                <FaPen/>
                                </button>         
                            </td>      
                        </tr>
                    ))
                ) : (
                    <p>No matching results</p>
                )}
            </tbody>
        </table>
        </>
    );
};

export default Fetch;