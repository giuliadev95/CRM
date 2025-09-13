import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect to configured routes without refreshing the page thanks to SPA
import { AiTwotoneDelete } from "react-icons/ai"; // bin icon to delete a contact
import { FaPen } from "react-icons/fa"; // pen to update a contact
import { IoMdEye } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import '@styles/app.css'
import Table from 'react-bootstrap/Table';

const ContactsList = () => {
    // Store all contacts fetched from the PostgreSQL database 
    const [ contacts, setContacts ] = useState([]);

    // Store the search input value and handles the input change
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // This constant hooks the "useNavigate()" functionalities to the "navigate" variable
    const navigate = useNavigate();
 
    // useEffect() hook to fetch all contacts from the backend endpoint, when the DOM mounts
    useEffect(()=> {
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
    
    
    // Contacts filtered by the "Search" bar +
    // Filter companies' names when you press the Search button
        const filteredContacts = contacts.filter((contact) => {
        const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
        const normalizedName = contact?.name?.toLowerCase().replace(/\s+/g, '');
        return normalizedName.includes(normalizedSearch);
    });

    // Function to handle the submit of the "searchbar" form
    function handleSubmit(e) {
    e.preventDefault();
    // Sanitize input with regex: trims whitespaces and Lowercases everything
    const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
    setSearchTerm(cleanedInput);
    }

    // Delete contact
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
        navigate(`/update-contact/${id}`);
    }

    const openContactView = (id) => {
        navigate(`/contact-view/${id}`);
    }
    
    // return:
    return (
        <>   
        <div>
            <form onSubmit={handleSubmit}>
                {/* Searchbar*/}
                <input 
                        type='text' 
                        placeholder='Nome contatto'
                        value = {input}
                        onChange = {(e) => setInput(e.target.value)}
                    />   
                    <button type="submit">Cerca</button>
            </form>
            {/* Button to add a new contact */}
            <button 
                type="button"
                onClick={()=> openForm()}
                >
                + Nuovo
            </button>
        </div>
        {/* Contact list table */}
        <Table hover>
            <thead>
                <tr>
                    <th scope="col"> Nome </th>
                    <th className="d-none d-md-table-cell"> Telefono</th>
                    <th className="d-none d-md-table-cell"> Email </th>
                    <th className="d-none d-md-table-cell"> Ruolo</th>
                    <th className="d-none d-md-table-cell"> Azienda</th>
                    {/*<th className="d-none d-md-table-cell"> Opzioni</th>*/}
                </tr>
            </thead>
            <tbody>
                {/* Map the fetched contacts to display each of them in a table row */}
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (  
                        <tr key={contact.id_contact}>
                            <td
                                className="flex justify-between items-start align-top gap-2 py-2"
                            >
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto', // Prima colonna flessibile, seconda solo quanto serve
                                        alignItems: 'start', // Allinea tutto in alto
                                        gap: '8px', // Spaziatura tra colonne
                                    }}>
                                    <div className="flex flex-col">
                                        {contact.name}
                                        <br/>
                                        {contact.email}
                                    </div>
                                </div>
                            </td>
                            
                            <td className="d-none d-md-table-cell">{contact.phone}</td>
                            <td className="d-none d-md-table-cell">{contact.email}</td>
                            <td className="d-none d-md-table-cell">{contact.role}</td>
                            <td className="d-none d-md-table-cell">{contact.company_name || "-"}</td>
                            {/**
                            <td className="d-none d-md-table-cell"> 
                            <button
                            type="button"
                            onClick={ ()=> openContactView(contact.id_contact) }
                            >
                            <IoMdEye/>
                            </button>   
                            
                            <button
                            type="button"
                            onClick={ ()=> deleteContact(contact.id_contact) }
                            >
                            <AiTwotoneDelete/>
                            </button>   
                            
                            
                            <button
                            type="button"
                            onClick={ ()=> openContactPage(contact.id_contact) }
                            >
                            <FaPen/>
                            </button>         
                            </td>
                            * 
                            */}
                            <td>
                                <div  
                                    className="bg-transparent border-none shadow-none p-0 m-0 outline-none">
                                    <BsThreeDotsVertical/>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <p>Nessun contatto trovato</p>
                )}
            </tbody>
        </Table>
        </>
    );
};

export default ContactsList;