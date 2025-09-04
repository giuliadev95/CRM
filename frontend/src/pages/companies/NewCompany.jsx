import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '@styles/app.css';

const NewCompany = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [company_type, setCompanyType] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newContact = {
            name,
            phone,
            email,
            website,
            company_type,
            notes
        };

        try {
            const res = await fetch("http://localhost:3000/api/company/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newContact)
            });

            if (!res.ok) throw new Error("Error: impossible to create the new company.");
            navigate("/companies");
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
                    placeholder="Nome"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Telefono"
                    required
                    value={phone}
                    onChange={(e)=> setPhone(e.target.value)}
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
                    name="website"
                    placeholder="Sito web"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <input
                    type="text"
                    name="type"
                    placeholder="Tipo"
                    required
                    value={company_type}
                    onChange={(e) => setCompanyType(e.target.value)}
                />

                 <input
                    type="text"
                    name="notes"
                    placeholder="Dettagli"
                    required
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <button 
                type="submit"
                >
                    Salva
                </button>
            </form>
            <button
                type="button"
                onClick= {()=> navigate('/companies')}
            >
                Indietro
            </button>
        </>
    );
};

export default NewCompany;
