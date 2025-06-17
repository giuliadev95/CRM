import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [companies, setCompanies] = useState([]);

    // 1. Fetch the contact's data basing on the { id }, that is a req. param, before updating its fields
    useEffect(() => {
        fetch(`http://localhost:3000/api/contact/get/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name || "");
                setEmail(data.email || "");
                setRole(data.role || "");
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
            email,
            role,
            company_id: parseInt(companyId),
            details: ""
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
            <h1>Update contact</h1>
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
                    <option value="">Company name</option>
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

export default UpdateContact;