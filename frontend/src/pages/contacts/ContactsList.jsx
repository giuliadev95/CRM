import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect to configured routes without refreshing the page thanks to SPA
//import { AiTwotoneDelete } from "react-icons/ai"; // bin icon to delete a contact
//import { FaPen } from "react-icons/fa"; // pen to update a contact
//import { IoMdEye } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import Contacts from "@/components/Contacts";
import Pagination from "@/components/Pagination";
import '@styles/app.css'

const ContactsList = () => {

    // Store all contacts fetched from the PostgreSQL database 
    const [ contacts, setContacts ] = useState([]);
    // setError
    const [theError, setTheError] = useState(null);


    // Store the search input value and handles the input change
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Set loader
    const [loading, setLoading] = useState(false);
    // Store the records number
    //const [records, setRecords] = useState([]);
    // Set initial page
    const [page, setPage] = useState(1);
    const [contactsPerPage] = useState(10);
    // This constant hooks the "useNavigate()" functionalities to the "navigate" variable
    const navigate = useNavigate();
 
    // useEffect() hook to fetch all contacts from the backend endpoint, when the DOM mounts
    /*
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
    */

    useEffect(()=> {
        const fetchContacts = async()=> {
            try{
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/contacts/get");
                console.log(response)
                console.log(response.data)
                // The fetched data update the content of the contact variable. This happens even after the deletion of a single contact.
                setContacts(response.data);
    
                // OUTPUT EXPECTED: [ { array of objects fetched from localhost:3000/api } ] , object
                console.log(response.data, typeof response.data);
                setLoading(false);

            } catch(error){
                 if(error.response && error.response.status === 404) {
                        setTheError("Contatti non trovati");
                        console.error(error);
                    } else {
                        setTheError("Si è verificato un errore, riprova.")
                    }
                    console.error(`Error fetching the contacts with the axios get method: ${error}`);
                    console.log(theError);
            } finally {
                setLoading(false);
            }              
        };
        fetchContacts();
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
    /*
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
    */

    // Open the page to create a new contact
    function openForm() {
        navigate("/new-contact")
    }

    /* 
        Open the page to update the contact
        const openContactPage = (id) => {
            navigate(`/update-contact/${id}`);
        }

        const openContactView = (id) => {
            navigate(`/contact-view/${id}`);
        }
    */
    // Get current contacts
    const indexOfLastContact = page * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
    const paginate = (number) => setPage(number);

    // return:
    return (
        <>  
            <Contacts
                contacts={currentContacts} loading={loading}
            />
            <Pagination
                contactsPerPage={contactsPerPage} totalContacts={contacts.length} paginate={paginate}
            />
            <div className="mx-8">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Contatti</li>
                    </ol>
                </nav>
                <div className="flex flex-col md:flex md:flex-row md:justify-between">
                    <h1 className="h2">Contatti</h1>
                    <div className="flex md:gap-2 justify-start gap-4 md:justify-between items-center my-4 md:hidden">
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            onClick={()=> openForm()}
                        >
                            Nuovo
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-success"
                        >
                            Esporta
                        </button>
                    </div>
                    <div className="hidden md:flex gap-4 justify-between items-center mb-2">
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            onClick={()=> openForm()}
                        >
                            Nuovo
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-success"
                        >
                            Esporta
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-4">
                {/* Contact list table */}
                <table class="table border table-hover">                
                    <thead>
                        <tr>
                            <td colspan="100">
                                <form class="d-flex w-100" onSubmit={handleSubmit}>
                                    <input 
                                        class="form-control me-2 w-100" 
                                        type="search" 
                                        placeholder="Search" 
                                        aria-label="Search"
                                        value={input}
                                        onChange={(e)=> setInput(e.target.value)}
                                    />
                                    <button class="btn btn-light border border-secondary " type="submit">Cerca</button>                 
                                </form>  
                            </td>
                        </tr>
                        <tr>
                            <th scope="col"> Nome </th>
                            <th scope="col">Cognome</th>
                            <th className="d-none d-md-table-cell" scope="col"> Telefono</th>
                            <th className="d-none d-md-table-cell"scope="col"> Email </th>
                            <th className="d-none d-md-table-cell" scope="col"> Ruolo</th>
                            <th className="d-none d-md-table-cell" scope="col"> Azienda</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map the fetched contacts to display each of them in a table row */}
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => (  
                                <tr key={contact.id_contact}>
                                    <td className="hover:underline cursor-pointer">{contact.name}</td>
                                    <td className="hover:underline cursor-pointer">{contact.surname}</td>  
                                    <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.phone}</td>
                                    <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.email}</td>
                                    <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.role}</td>
                                    <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.company_name || "-"}</td>
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
                </table>
            </div>
        </>
    );
};

export default ContactsList;