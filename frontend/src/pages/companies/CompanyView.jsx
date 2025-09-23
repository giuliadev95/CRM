import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import View from "@/components/Global/View";
import '@styles/app.css';

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
        <div className="company-view-container"> 
            {company ? (
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
                    ]}/>
                       
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                                Nessuna azienda trovata
                            </td>
                        </tr>
                    )}
        </div>
    );
};

export default CompanyView;