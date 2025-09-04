/*
const CompanyView = () => {
    return(
        <>
        <h3>
            Company View
        </h3></>
    )
}
export default CompanyView;
*/

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaPen } from "react-icons/fa";
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
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefono</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Tipo</th>
                        <th>Dettagli</th>
                        <th>Opzioni</th>
                    </tr>
                </thead>
                <tbody>
                    {company ? (
                        <tr>
                            <td>{company.name}</td>
                            <td>{company.phone}</td>
                            <td>{company.email}</td>
                            <td>{company.website}</td>
                            <td>{company.company_type || "-"}</td>
                            <td>{company.notes}</td>
                            <td className="actions-button-container">
                                <button
                                    type="button"
                                    className="actions-button"
                                    onClick={() => deleteCompany(company.id_company)}
                                >
                                    <AiTwotoneDelete />
                                </button>
                                <button
                                    type="button"
                                    className="actions-button"
                                    onClick={() => openCompanyPage(company.id_company)}
                                >
                                    <FaPen />
                                </button>
                            </td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: "center" }}>
                                Nessuna azienda trovata
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                type="button"
                onClick={ (e)=> navigate("/companies")}
            >
                Indietro
            </button>
        </div>
    );
};

export default CompanyView;