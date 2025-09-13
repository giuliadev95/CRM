import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@styles/app.css';

const NewProject = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");
    const [companies, setCompanies] = useState([]);

    // Fetch delle aziende per la select
    useEffect(() => {
        fetch("http://localhost:3000/api/companies/get")
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error("Error fetching companies:", err));
    }, []);

    // Submit del nuovo progetto
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProject = {
            name,
            description,
            company_id: parseInt(companyId),
            status,
            start_date: startDate,
            end_date: endDate,
            budget
        };

        try {
            const res = await fetch("http://localhost:3000/api/project/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProject)
            });

            if (!res.ok) throw new Error("Error: impossible to create the new project.");
            navigate("/projects");
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} id="form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nome progetto"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Descrizione progetto"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    name="company"
                    id="company"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    required
                >
                    <option value="">Azienda</option>
                    {companies.map((c) => (
                        <option key={c.id_company} value={c.id_company}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <input
                    type="date"
                    name="start_date"
                    placeholder="Data inizio"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />

                <input
                    type="date"
                    name="end_date"
                    placeholder="Data fine"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <input
                    type="number"
                    name="budget"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />

                <button type="submit">
                    Salva
                </button>
            </form>
            <button
                type="button"
                onClick={() => navigate('/projects')}
            >
                Indietro
            </button>
        </>
    );
};

export default NewProject;
