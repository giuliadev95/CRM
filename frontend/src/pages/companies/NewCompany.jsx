import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/Global/BreadCrumb";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import '@styles/app.css';

const NewCompany = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [company_type, setCompanyType] = useState("");
    const [notes, setNotes] = useState("");

    // Breadcrumb configuration
    const breadCrumbitems= [
        {label: "Home", href: "/"},
        {label : "Aziende", href:"/companies"},
        {label : "Nuova azienda"}
    ]

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
            const res = await fetch("http://192.168.1.3:3000/api/company/post", {
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
            <div className='container px-4 md:px-0'>
                <Breadcrumb items={breadCrumbitems}/>
                <button
                        type="button"
                        onClick={()=> navigate(-1)}
                        className="flex gap-1 items-center mb-4"
                    >
                        <IoMdArrowRoundBack/>
                        {" Indietro"}
                    </button> 
                <h2 className='flex gap-2'> 
                    <FaEdit /> 
                    Nuova azienda
                </h2>
                <form 
                    className='max-w-[80%] md:max-w-[50%] flex flex-col gap-3 md:gap-6'
                    onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label for="name" class="form-label">Nome</label>
                        <input
                            id='name'
                            class='form-control'
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>   
                    <div className='flex flex-col gap-1'>
                        <label for="name" class="form-label">Email</label>           
                        <input
                            id='email'
                            class='form-control'
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="name" class="form-label">Telefono</label>
                        <input
                            id='phone'
                            class='form-control'
                            type="text"
                            placeholder="Phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="website" class="form-label">Sito web</label>
                        <input
                            id='website'
                            class='form-control'
                            type="text"
                            name="website"
                            placeholder="Sito web"
                            required
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label for="type" class="form-label">Tipo</label>
                        <select
                            class="form-select"
                            name="type"
                            id="type"
                            value={company_type}
                            onChange={(e) => setCompanyType(e.target.value)}
                            required
                            className='max-w-[8rem] md:max-w-35 border rounded p-1 bg-white'
                            >
                            <option selected>Seleziona il tipo</option>            
                                <>
                                    <option value="Client">Cliente</option>
                                    <option value="Supplier">Fornitore</option>
                                    <option value="Partner">Collaboratore</option>
                                    <option value="Seller">Venditore</option>
                                    <option value="Buyer">Compratore</option>
                                    <option value="Assurance">Assicurazione</option>
                                </>    
                        </select>
                    </div>
                    <div>
                        <label for="details" class="form-label">Dettagli</label>
                        <textarea
                            id='details'
                            class='form-control'
                            type="text"
                            placeholder="Notes"              
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
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

export default NewCompany;
