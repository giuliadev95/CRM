// Contacts.jsx
import React from "react";

const Contacts = ({ contacts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!contacts || contacts.length === 0) {
    return <p>Nessun contatto trovato</p>;
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id_contact}>
          <table className="table border table-hover">
            <tbody>
              <tr>
                <td>{contact.name}</td>
              </tr>
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;