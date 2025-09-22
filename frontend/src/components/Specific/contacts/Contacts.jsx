// Contacts.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect to configured routes without refreshing the page thanks to SPA
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Contacts = ({ contacts, loading }) => { 
  // constants I need, moved here  rom the ContactsList.jsx component
  const [input, setInput] = useState("");
  const [filteredContacts, setFilteredContacts]= useState([]);
  // This constant hooks the "useNavigate()" functionalities to the "navigate" variable
  const navigate = useNavigate();

  // Open the page to update the contact
  const openContactPage = (id) => {
      navigate(`/update-contact/${id}`);
  }

  const openContactView = (id) => {
      navigate(`/contact-view/${id}`);
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
            setFilteredContacts(contacts.filter((contact) => contact.id_contact !== id));
        })
        .catch((err) => console.error(`Error: ${err}`));
    }
    
  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');  
    try {
      const res = await axios.get("http://localhost:3000/api/contacts/search/contact", {
        params: { q: cleanedInput }, 
      });
      setFilteredContacts(res.data);
    } catch (err) {
      console.error("Error in the query:", err);
    }
  }

   useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!contacts || contacts.length === 0) {
    return <p>Nessun contatto trovato</p>
  }

  return (
    <div>  
      <table className="table border table-hover">
          <thead>
            <tr>
              <td colspan="100">
                  <form class="d-flex w-100"onSubmit={handleSubmit} >
                      <input 
                          class="form-control me-2 w-100" 
                          type="search" 
                          placeholder="Cerca" 
                          aria-label="Search"  
                          value={input}
                          onChange={(e)=> setInput(e.target.value)}         
                      />
                      <button class="btn btn-light border border-secondary " type="submit">Cerca</button>                 
                  </form>  
              </td>
            </tr>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Cognome</th>
              <th className="d-none d-md-table-cell" scope="col">Telefono</th>
              <th className="d-none d-md-table-cell" scope="col">Email</th>
              <th className="d-none d-md-table-cell" scope="col">Ruolo</th>
              <th className="d-none d-md-table-cell" scope="col">Azienda</th>
              <th></th>
            </tr>
          </thead>
          {/* Map the fetched contacts to display each of them in a table row */}
          <tbody>
  {filteredContacts.length > 0 ? (
    filteredContacts.map((contact) => (
      <tr key={contact.id_contact}>
        <td 
          className="hover:underline cursor-pointer" 
          onClick={() => openContactView(contact.id_contact)}
        >
          {contact.name}
        </td>
        <td className="hover:underline cursor-pointer">{contact.surname || "-"}</td>
        <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.phone || "-"}</td>
        <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.email || "-"}</td>
        <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.role || "-"}</td>
        <td className="d-none d-md-table-cell hover:underline cursor-pointer">{contact.company_name || "-"}</td>
        <td className="hover:underline cursor-pointer">
          <button  
            onClick={() => openContactPage(contact.id_contact)}
            className="bg-transparent border-none shadow-none p-0 m-0 outline-none"
          >
            <MdModeEdit />
          </button>
          <button  
            onClick={() => deleteContact(contact.id_contact)}
            className="bg-transparent border-none shadow-none p-0 m-0 outline-none"
          >
            <MdDelete />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center text-muted">
        Nessun contatto presente
      </td>
    </tr>
  )}
</tbody>

    </table>
  </div>
  );
};

export default Contacts;