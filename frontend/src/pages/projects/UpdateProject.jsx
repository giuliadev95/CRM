// IMPORT
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@styles/app.css';

// COMPONENT
const UpdateProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget]= useState("");
    const [companies, setCompanies] = useState([]);
    
    // FETCH PROJECT DATA
    useEffect(() => {
        fetch(`http://localhost:3000/api/project/get/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setName(data.name || "");
            setDescription(data.description || "");
            setCompanyId(data.company_id?.toString() || "");
            setStatus(data.status || "");
            setStartDate(formatDateForInput(data.start_date) || "");
            setEndDate(formatDateForInput(data.end_date) || "");
            setBudget(data.budget || "");
        })
        .catch((err) => console.error(err));
    }, [id]);

    // Format the date from the back-end for the front-end, so it's displayed
    function formatDateForInput(isoString) {
        if (!isoString) return "";
        return isoString.split('T')[0];
    }

    // Function to navigate back to the page that views  single project
    const handleBack = (id) => {
    navigate(-1);
  };

    // FETCH COMPANIES
    useEffect(() => {
        fetch("http://localhost:3000/api/companies/get")
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error("There was an error in fetching the companies: ", err));
    }, []);

    // UPDATE PROJECT
    const handleUpdate = async (event) => {
        event.preventDefault();

        const updatedProject = {
            name,
            description,
            company_id: parseInt(companyId),
            status,
            start_date: startDate,
            end_date: endDate,
            budget
        };

        try {
            const res = await fetch(`http://localhost:3000/api/project/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProject)
            });

            if (!res.ok) throw new Error("Error with the project update.");
            navigate("/projects");
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Write down the project's details"
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
                    <option value="">Seleziona l'azienda</option>
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
                    placeholder="01/01/2001"
                    required
                    value={startDate}
                    onChange={(e)=> setStartDate(e.target.value)}
                />

                <input
                    type="date"
                    name="end_date"
                    placeholder="01/01/2001"
                    value={endDate}
                    onChange={(e)=> setEndDate(e.target.value)}
                />

                <input
                    type="number"
                    name="budget"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e)=> setBudget(e.target.value)}
                />

                <button 
                    type="submit"
                >
                    Salva
                </button>
                <button
                    type="button"
                    onClick={ handleBack}
                >
                    Indietro
                </button>
            </form>
        </>
    );
};

export default UpdateProject;
