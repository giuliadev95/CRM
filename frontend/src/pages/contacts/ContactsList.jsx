import axios from "axios";
import { useState, useEffect } from "react";
import { href, useNavigate } from "react-router-dom"; // Import useNavigate to redirect to configured routes without refreshing the page thanks to SPA
import Contacts from "@/components/Contacts";
import Pagination from "@/components/Pagination";
import '@styles/app.css'
import ExportPDF from "@/components/ExportPDF";
import Breadcrumb from "@/components/Global/BreadCrumb";

const ContactsList = () => {

    // Store all contacts fetched from the PostgreSQL database 
    const [ contacts, setContacts ] = useState([]);
    // setError
    const [theError, setTheError] = useState(null);

    // Set loader
    const [loading, setLoading] = useState(false);

    // Set initial page
    const [page, setPage] = useState(1);
    const [contactsPerPage] = useState(10);

    // BreadCrumb items imported from breadCrumb.jsx
    const breadCrumbitems= [
        { label: "Home", href: "/" },
        {label: "Contatti"}
    ]

    // This constant hooks the "useNavigate()" functionalities to the "navigate" variable
    const navigate = useNavigate();
 
    // useEffect to fetch the contacts from the PostgreSQL database, and to set the Loader
       useEffect(()=> {
        const fetchContacts = async()=> {
            try{
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/contacts/get");
                console.log(response)
                console.log(response.data)
                // The fetched data update the content of the contact variable. This happens even after the deletion of a single contact.
                setContacts(response.data);
    
                // EXPECTED OUTPUT: [ An array of objects { }, { },... ] , "object".
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

    // Open the page to create a new contact
    function openForm() {
        navigate("/new-contact")
    }

    // Get current contacts
    const indexOfLastContact = page * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
    const paginate = (number) => setPage(number);

    // return:
    return (
        <>  
            <div className="mx-8">
                <Breadcrumb items={breadCrumbitems}
                />
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
                        <ExportPDF contacts={contacts}/>
                    </div>
                    <div className="hidden md:flex gap-4 justify-between items-center mb-2">
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            onClick={()=> openForm()}
                        >
                            Nuovo
                        </button>
                        <ExportPDF contacts={contacts}/>
                    </div>
                </div>
            </div>
            <div className="mx-8">
                <Contacts
                    contacts={currentContacts} loading={loading}
                />
                <Pagination
                    recordsPerPage={contactsPerPage} totalRecords={contacts.length} paginate={paginate}
                />
            </div>
        </>
    );
};

export default ContactsList;
