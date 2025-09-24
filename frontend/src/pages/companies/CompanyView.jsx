import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import View from "@/components/Global/View";
import '@styles/app.css';
import ExportPDF_company from "@/components/Specific/ExportPDF/ExportPDF_company_details";

const CompanyView = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/api/company/get/${id}`)
            .then((res) => res.json())
            .then((data) => setCompany(data))
            .catch((err) => console.error(err));
    }, [id]);

    function deleteCompany(id) {
        if (!id) return console.error("The ID is missing to perform the deletion.");
        fetch(`http://localhost:3000/api/company/delete/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Error during the deletion.");
            navigate("/"); // Navigate to the Homepage
        })
        .catch((err) => console.error(`Error: ${err}`));
    }

    const openCompanyPage = (id) => {
        navigate(`/update-company/${id}`);
    }

    return (
        <>
            <div className="company-view-container"> 
                {company ? (
                    <>
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
                            company={company}
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
                                onClick={() => deleteCompany(company.id_company)}
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
        </>
    );
};

export default CompanyView;