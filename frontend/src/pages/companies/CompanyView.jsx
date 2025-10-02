import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import View from "@/components/Global/View";
import ExportPDF_company from "@/components/Specific/ExportPDF/ExportPDF_company_details";
import Breadcrumb from "@/components/Global/BreadCrumb";
import '@styles/app.css';

const CompanyView = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    
    // BreadCrumb items imported from breadCrumb.jsx
    const breadCrumbitems= [
        { label: "Home", href: "/" },
        { label: "Aziende", href:"/companies"},
        {label: "Dettagli"}
    ]
    
    const [showConfirm, setShowConfirm] = useState(false); // dont's show the pop-up msg by default
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`http://192.168.1.3:3000/api/company/get/${id}`)
            .then((res) => res.json())
            .then((data) => setCompany(data))
            .catch((err) => console.error(err));
    }, [id]);

    // Delete company
    function deleteCompany(id) {
        if (!id) return console.error("The ID is missing to perform the deletion.");
        fetch(`http://192.168.1.3:3000/api/company/delete/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Error during the deletion.");
            navigate(-1); // Navigate back 
        })
        .catch((err) => console.error(`Error: ${err}`));
        setShowConfirm(false);
    }

    // Open edit page
    const openCompanyPage = (id) => {
        navigate(`/update-company/${id}`);
    }

    return (
        <>
            <div className="mx-8">
                <Breadcrumb items={breadCrumbitems}/>
            </div>
            {company ? (
                <div className="max-w-xl">
                    {/* Display the View component */ }
                    <View 
                        avatar={"company"}
                        title={company.name}
                        fields={[
                            {
                                label: "Nome",
                                value: company.name
                            },
                            {
                                label: "Telefono",
                                value: company.phone
                            },
                            {
                                label: "Email",
                                value: company.email
                            },
                            {
                                label: "Sito web",
                                value: company.website
                            },
                            {
                                label: "Tipologia",
                                value: company.company_type
                            },
                            {
                                label: "Dettagli",
                                value: company.notes
                            }
                        ]}
                    /> 
                    {/* Display the 3 buttons: Export, Edit, Delete */ }
                    <div className="mx-8 flex flex-col sm:flex-row gap-3 md:gap-0 max-w-fit justify-center ">
                        <ExportPDF_company company={company}/>
                        <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() => openCompanyPage(company.id_company)}
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
                </div>
            ) : (
                <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                        Nessuna azienda trovata
                    </td>
                </tr>
            )}
            {/* Pop up msg to ask the user if he wants to delete the Company */}         
            {showConfirm && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="mb-4 text-lg">
                                Eliminare l'azienda definitivamente?
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button 
                                    className="btn btn-danger"
                                    onClick={()=> deleteCompany(company.id_company)} // delete the company and navigate back of 1 page
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

export default CompanyView;