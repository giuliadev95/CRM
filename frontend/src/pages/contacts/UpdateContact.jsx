import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@styles/app.css';

const UpdateContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [details, setDetails] = useState(""); // Add details row to be modified
    const [companyId, setCompanyId] = useState("");
    const [companies, setCompanies] = useState([]);

    // 1. Fetch the contact's data basing on the { id }, that is a req. param, before updating its fields
    useEffect(() => {
        fetch(`http://localhost:3000/api/contact/get/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name || "");
                setSurname(data.surname || "");
                setPhone(data.phone || "");
                setEmail(data.email || "");
                setRole(data.role || "");
                setDetails(data.details || "");
                setCompanyId(data.company_id?.toString() || ""); // convert the company_id { id } from an int to a string, to perform the select on the sql database.
            })
            .catch((err) => console.error(err));
    }, [id]);

    // 2. Fetch the companies' data too
    useEffect(() => {
        fetch("http://localhost:3000/api/companies/get")
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error("There was an error in fetching the companies: ", err));
    }, []);

    // 3. Form submission handler
    const handleUpdate = async (event) => {
        event.preventDefault();

        const updatedContact = {
            name,
            surname,
            phone,
            email,
            role,
            company_id: parseInt(companyId),
            details
        };

        try {
            const res = await fetch(`http://localhost:3000/api/contact/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedContact)
            });

            if (!res.ok) throw new Error("Error with the contact update.");
            navigate("/");
            return res.json();
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
                    placeholder="Nome"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Cognome"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                 <input
                    type="text"
                    name="phone"
                    placeholder="Telefono"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    name="role"
                    placeholder="Ruolo"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <input
                    type="text"
                    name="details"
                    placeholder="Dettagli"
                    
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />

                <select
                    name="company"
                    id="company"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    required
                >
                    <option value="">Seleziona Azienda</option>
                    {companies.map((c) => (
                        <option key={c.id_company} value={c.id_company}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={()=> navigate("/new-company")}
                >
                    Aggiungi nuova
                </button>

                <button 
                    type="submit"
                >
                    Salva
                </button>
                <button 
                    type="button"
                    onClick= {()=>  navigate("/")}
                >
                    Indietro
                </button>

            </form>
        </>
    );
};

export default UpdateContact;