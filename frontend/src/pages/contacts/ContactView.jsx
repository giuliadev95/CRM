import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import '@styles/app.css';

const ContactView = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/api/contact/get/${id}`)
            .then((res) => res.json())
            .then((data) => setContact(data))
            .catch((err) => console.error(err));
    }, [id]);

    // Function to delete the contact
    function deleteContact(id) {
        if (!id) return console.error("The ID is missing to perform the deletion.");
        fetch(`http://localhost:3000/api/contact/delete/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Error during the deletion.");
            navigate("/"); // Navigate back to the Homepage
        })
        .catch((err) => console.error(`Error: ${err}`));
    }

    const openContactPage = (id) => {
        navigate(`/update-contact/${id}`);
    }

    return (
        <div className="contact-view-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ruolo</th>
                        <th>Azienda</th>
                        <th>Dettagli</th>
                        <th>Opzioni</th>
                    </tr>
                </thead>
                <tbody>
                    {contact ? (
                        <tr>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.role}</td>
                            <td>{contact.company_name || "-"}</td>
                            <td>{contact.details}</td>
                            <td className="actions-button-container">
                                <button
                                    type="button"
                                    className="actions-button"
                                    onClick={() => deleteContact(contact.id_contact)}
                                >
                                    <AiTwotoneDelete />
                                </button>
                                <button
                                    type="button"
                                    className="actions-button"
                                    onClick={() => openContactPage(contact.id_contact)}
                                >
                                    <FaPen />
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                                Nessun contatto trovato
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                type="button"
                onClick={ (e)=> navigate ("/")}
            >
                Indietro
            </button>
        </div>
    );
};

export default ContactView;