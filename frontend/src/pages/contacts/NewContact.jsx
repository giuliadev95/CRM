import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import Breadcrumb from "@/components/Global/BreadCrumb";
import '@styles/app.css';

const NewContact = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [details, setDetails] = useState("");
    const [companies, setCompanies] = useState([]);

     const breadCrumbitems= [
        {label : "Home", href:"/"},
        {label : "Contatti", href:"/"},
        {label: "Nuovo"}
    ]

    useEffect(() => {
        fetch("http://localhost:3000/api/companies/get")
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data);
                console.log("Fetched companies array:", data);
            })
            .catch((err) => console.error("Error fetching companies:", err));
    }, []);

    // Force the page to be viewed from the top, because by default I see it starting from the H2, leaving the BreadBrumb off sigth.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newContact = {
            name,
            surname,
            phone,
            email,
            role,
            company_id: parseInt(companyId),
            details
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
         <div className='container my-4 px-4 md:px-0'>
            <Breadcrumb items={breadCrumbitems}/>
            <button
                type="button"
                onClick={()=> navigate(-1)}
                className="flex gap-1 items-center mb-4"
            >
                <IoMdArrowRoundBack/>{" Indietro"}
            </button> 
            <h2 className='flex gap-2'> 
                <FaEdit /> 
                Nuovo contatto
            </h2>
            <form 
                className='max-w-[80%] md:max-w-[50%] flex flex-col gap-3 md:gap-6'
                onSubmit={handleSubmit}
                >
                <div className='flex flex-col gap-1'>
                    <label for="name" className="form-label">Nome</label>
                    <input
                        id='name'
                        className='form-control'
                        type="text"
                        placeholder="Nome"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label for="surname" className="form-label">Cognome</label>
                    <input
                        id='surname'
                        type="text"
                        className='form-control'
                        placeholder="Cognome"
                        required
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                    <div>
                        <label for="phone" className="form-label">Telefono</label>
                        <input
                            id='phone'
                            className='form-control'
                            type="text"
                            name="phone"
                            placeholder="Telefono"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="email" className="form-label">Email</label>
                        <input
                            id='email'
                            className='form-control'
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                <div>
                    <label for="role" className="form-label">Ruolo</label>
                    <input
                        id='role'
                        className='form-control'
                        type="text"
                        name="role"
                        placeholder="Ruolo"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>

                <div>
                    <label for="details" className="form-label">Dettagli</label>
                    <textarea
                        id='details'
                        className='form-control'
                        type="text"
                        name="details"
                        placeholder="Dettagli"             
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </div>

                <div className='flex items-center gap-4'> 
                    <div>
                        <label for="company" className="form-label">Azienda</label>
                        <select
                            className="form-select"
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
                    </div>     
                    <button className='pt-[2rem]'
                        type="button"
                        onClick={()=> navigate("/new-company")}
                        >
                        <IoIosAddCircle className="w-[1.5rem] h-[1.5rem] mdw-[2rem] md:h-[2rem] text-blue-500"/>
                    </button>
                </div>
                <div className="flex flex-wrap items-center sm:flex-row gap-3 md:gap-0 max-w-fit justify-start md:justify-center ">
                    <button 
                        type="submit"
                        className="btn btn-primary w-[6rem]"
                    >
                        Salva
                    </button>
                    <button 
                        type="button"
                        className="btn btn-dark w-[6rem]"
                        onClick= {()=>  navigate(-1)}
                    > 
                        Annulla
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default NewContact;
