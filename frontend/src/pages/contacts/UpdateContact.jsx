import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { IoMdArrowRoundBack } from 'react-icons/io';
import Breadcrumb from '@/components/Global/BreadCrumb';
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
    const [contactDetails, setContactDetails] = useState(null);
    
    const breadCrumbitems= [
        {label : "Home", href:"/"},
        {label : "Contatti", href:"/"},
        {label: contactDetails, href:"#", onClick:(e)=> {
            e.preventDefault();
            navigate(-1);
            } 
        },
        {label: "Modifica"}
    ]

    // 1. Fetch the contact's data basing on the { id }, that is a req. param, before updating its fields
    useEffect(() => {
        fetch(`http://localhost:3000/api/contact/get/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setName(data.name || "");
            const fullName = ` ${data.name} ${data.surname}`;
            setContactDetails(fullName);
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

    // Force the page to be viewd from the top, because by default I see it starting from the H2, leaving the BreadBrumb off sigth.
    useEffect(() => {
        window.scrollTo(0, 0);
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
            navigate(-1);
            return res.json();
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
                    Modifica contatto
                </h2>
                <form 
                    className='max-w-[80%] md:max-w-[50%] flex flex-col gap-3 md:gap-6'
                    onSubmit={handleUpdate}
                >
                    <div className='flex flex-col gap-1'>
                        <label for="name" class="form-label">Nome</label>
                        <input
                            id='name'
                            class='form-control'
                            type="text"
                            placeholder="Nome"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="surname" class="form-label">Cognome</label>
                        <input
                            id='surname'
                            class='form-control'
                            type="text"
                            className='form-control'
                            placeholder="Cognome"
                            required
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="phone" class="form-label">Telefono</label>
                        <input
                            id='phone'
                            class='form-control'
                            type="text"
                            name="phone"
                            placeholder="Telefono"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="email" class="form-label">Email</label>
                        <input
                            id='email'
                            class='form-control'
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="role" class="form-label">Ruolo</label>
                        <input
                            id='role'
                            class='form-control'
                            type="text"
                            name="role"
                            placeholder="Ruolo"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="details" class="form-label">Dettagli</label>
                        <textarea
                            id='details'
                            class='form-control'
                            type="text"
                            name="details"
                            placeholder="Dettagli"
                            
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center gap-4'> 
                        <div>
                            <label for="company" class="form-label">Azienda</label>
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
                        <button
                            type="button"
                            onClick={()=> navigate("/new-company")}
                            >
                            <IoIosAddCircle className="w-[2rem] h-[2rem] text-blue-500"/>
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

export default UpdateContact;