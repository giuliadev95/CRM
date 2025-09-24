import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import View from "@/components/Global/View";
import ExportPDF_contact from "@/components/Specific/ExportPDF/ExportPDF_contacts_details";
import Breadcrumb from "@/components/Global/BreadCrumb";
import '@styles/app.css';

const ContactView = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false); // dont's show the pop-up msg by default
     
    //BreadCrumb items imported from breadCrumb.jsx
    const breadCrumbitems= [
        { label: "Home", href: "/" },
        { label: "Contatti", href:"/contatti"},
        {label: `Dettagli`}
    ]
        
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
        setShowConfirm(false);
    }

    const openContactPage = (id) => {
        navigate(`/update-contact/${id}`);
    }

    return (
        <>
            <div>
                <Breadcrumb items={breadCrumbitems}/>
                {contact ? (
                    <>
                        {/* Display the View component */ }
                        <View 
                            avatar={"contact"}
                            title={contact.name}
                            fields={[
                                {
                                    label: "Nome",
                                    value: contact.name
                                },
                                {
                                    label: "Cognome",
                                    value: contact.surname
                                },
                                {
                                    label: "Telefono",
                                    value: contact.phone
                                },
                                {
                                    label: "Email",
                                    value: contact.email
                                },
                                {
                                    label: "Ruolo",
                                    value: contact.role
                                },
                                {
                                    label: "Azienda",
                                    value: contact.company_name
                                },
                                {
                                    label: "Dettagli",
                                    value: contact.details
                                }
                            ]}
                        /> 
                    {/* Display the 3 buttons: Export, Edit, Delete */ }
                    <div className="mx-4 flex flex-wrap items-center sm:flex-row gap-3 md:gap-0 max-w-fit justify-start md:justify-center ">
                        <ExportPDF_contact contact={contact}/>
                        <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() => openContactPage(contact.id)}
                            >
                                Modifica
                        </button>
                        <button
                            class="btn btn-danger"
                            type="button"
                            onClick={()=> setShowConfirm(true)} // pop-up opening
                        >
                            Elimina
                        </button>
                    </div>
                </>
                ) : (
                    <tr>
                        <td colSpan={5} style={{ textAlign: "center" }}>
                            Nessuna azienda trovata
                        </td>
                    </tr>
                )}
            </div>
            {/* Pop up msg to ask the user if he wants to delete the Company */}         
            {showConfirm && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="mb-4 text-lg">
                                Confermi di voler eliminare quest'azienda definitivamente?
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button 
                                    className="btn btn-danger"
                                    onClick={()=> deleteContact(contact.id)} // delete the contact and navigate back of 1 page
                                >
                                    Sì
                                </button>
                                <button 
                                    className="btn btn-secondary"
                                    onClick={() => setShowConfirm(false)} // just close the pop-up
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ContactView;