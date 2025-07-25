import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

const AddContact = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/companies/get")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data);
                console.log("Fetched companies array:", data);
            })
            .catch((err) => console.error("Error fetching companies:", err));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newContact = {
            name,
            email,
            role,
            company_id: parseInt(companyId),
            details: ""
        };

        try {
            const res = await fetch("http://localhost:3000/api/contact/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContact)
            });

            if (!res.ok) throw new Error("Error: impossible to create the new contact.");
            navigate("/");
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <>
            <h1>Add a new contact</h1>
            <form onSubmit={handleSubmit} id="form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="Role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <select
                    name="company"
                    id="company"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    required
                >
                    <option value="">Select company</option>
                    {companies.map((c) => (
                        <option key={c.id_company} value={c.id_company}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <button type="submit" className="add">Save</button>
            </form>
        </>
    );
};

export default AddContact;
