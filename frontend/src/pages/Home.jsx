import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect to internal routes without refreshing the page thanks to SPA
import { AiTwotoneDelete } from "react-icons/ai"; // bin icon to delete a contact
import { FaPen } from "react-icons/fa"; // pen to update a contact


const Fetch = () => {
    const [ contacts, setContacts ] = useState([]); // Store all contacts fetched from the db with a get() 
    const [input, setInput] = useState(""); // Store the search input value and handle the input change
    const navigate = useNavigate(); // hook the redirecting useNavigate functionalities to the navigate variable
    {/** 3 => 4 [ setContacts ] */}
    useEffect(()=> {
        fetch("http://localhost:5000/api/") // Fetch all contacts from the backend when the component mounts
        .then ( (response) => response.json() )
        .then( (data) => {
            setContacts(data); // setContacts = data => DATA = CONTACTS (UPDATED AFTER DELETION)
            console.log(data, typeof data); // [ { array of objects fetched from localhost:5000/api } ] , object
       })
       .catch((err) => console.error(`There was an error fetching contacts: ${err}`));
    },[]);
    
    {/** 5 */}
    // Filter contacts based on the search input
    const filteredContacts = contacts.filter((contact) => {
        return (
            contact &&
            contact.name &&
            contact.name.toLowerCase().includes(input.toLowerCase())
        );
    });

    {/** 2 */}
    // DeleteContact function  
    function deleteContact(id) {
        if (!id) return console.error("ID mancante per l'eliminazione.");
    
        fetch(`http://localhost:5000/api/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Errore durante l'eliminazione");
            console.log(`Contatto con ID ${id} eliminato.`);
            setContacts(contacts.filter((contact) => contact.id_contact !== id));
        })
        .catch((err) => console.error(`Errore: ${err}`));
    }

    function openForm() {
        //window.location.href = "http://localhost:5173/nuovo-contatto"
        navigate("/nuovo-contatto")
    }

    const openContactPage = (id) => {
        navigate(`/modifica-contatto/${id}`);
    }
    
    
    // return:
    return (
        <>   
        {/** 1 */}
        <div class="contacts-field-container">
        <input 
                type='text' 
                placeholder='Cerca' 
                class="searchBar" 
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
                />   
        {/** Button add new contact */}
        <button 
            type="button" 
            class="add-new-contact"
            onClick={ ()=> openForm()}
            >
            + Nuovo
        </button>
        </div>
        {/** 2 */}
        <table>
            <thead>
                <tr>
                    <th scope="col"> Nome </th>
                    <th scope="col"> Email </th>
                    <th scope="col"> Ruolo</th>
                    <th scope="col"> Azienda</th>
                    <th scope="col"> Azioni</th>
                </tr>
            </thead>
            <tbody>
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (  
                        <tr key={contact.id_contact}>
                            <td> {contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.role}</td>
                            <td>{contact.company_name || "-"}</td>
                            <td class="update-delete-btn-container">     {/** 2 */}
                                <button
                                type="button"
                                id="delete"
                                onClick={ ()=> deleteContact(contact.id_contact) } // with the onClick() function, this delete function gets executed after the fetching of the contacts
                                >
                                <AiTwotoneDelete/>
                                </button>     
                                <button
                                type="button"
                                id="update"
                                onClick={ ()=> openContactPage(contact.id_contact) } // with the onClick() function, this delete function gets executed after the fetching of the contacts
                                >
                                <FaPen/>
                                </button>         
                            </td>      
                        </tr>
                    ))
                ) : (
                    <p>Nessun risultato</p>
                )}
            </tbody>
        </table>
        </>
    );
};

export default Fetch;