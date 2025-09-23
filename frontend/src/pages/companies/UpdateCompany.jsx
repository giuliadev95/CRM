import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@styles/app.css';

const UpdateCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [company_type, setCompanyType] = useState("");
    const [notes, setNotes] = useState("");
 
    // 1. Fetch the company's data basing on the { id }, that is a req. param, before updating its fields
    useEffect(() => {
        fetch(`http://localhost:3000/api/company/get/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name || "");
                setPhone(data.phone || "");
                setEmail(data.email || "");
                setWebsite(data.website || "");
                setCompanyType(data.company_type || "");
                setNotes(data.notes || "");
            })
            .catch((err) => console.error(err));
    }, [id]);

    // 2. Form submission handler
    const handleUpdate = async (event) => {
        event.preventDefault();

        const updatedCompany = {
            name,
            phone,
            email,
            website,
            company_type,
            notes
        };

        try {
            const res = await fetch(`http://localhost:3000/api/company/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCompany)
            });

            if (!res.ok) throw new Error("Error with the company update.");
            navigate(`/company-view/${id}`);
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
                    name="phone"
                    placeholder="Phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    type="text"
                    name="website"
                    placeholder="Website"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <input
                    type="text"
                    name="notes"
                    placeholder="Notes"              
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <button 
                    type="submit"
                >
                    Salva
                </button>
                <button
                    type="button"
                    onClick={(e)=> navigate("/companies")}
                >
                    Indietro
                </button>
            </form>
        </>
    );
};

export default UpdateCompany;