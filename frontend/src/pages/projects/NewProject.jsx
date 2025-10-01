import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/components/Global/BreadCrumb";
import MsgSuccess from "@/components/Global/MsgSuccess";
import MsgDeny from "@/components/Global/MsgDeny";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

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
    const [showConfirm, setShowConfirm]= useState(false);
    const [showDeny, setShowDeny]= useState(false);

    // Breadcrumb configuration
    const breadCrumbitems= [
        {label: "Home", href:"/"},
        {label: "Progetti", href:"/projects"},
        {label:"Nuovo progetto"}
    ]

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
            setShowConfirm(true);
            setTimeout(()=> {
                setShowConfirm(false);
                navigate(-1);
            }, 1200)
        } catch (err) {
            console.error("Error:", err);
            setTimeout(()=> {
                setShowDeny(true);
            }, 1200)
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
                    <IoMdArrowRoundBack/>
                    {" Indietro"}
                </button>
                <h2 className='flex gap-2'> 
                    <FaEdit /> 
                    Nuovo progetto
                </h2>
                <form 
                    className='max-w-[80%] md:max-w-[50%] flex flex-col gap-3 md:gap-6'
                    onSubmit={handleSubmit} id="form">
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
                    <div>
                        <label for="description" class="form-label">Descrizione</label>
                        <textarea
                            id='description'
                            class='form-control'
                            type="text"
                            placeholder="Notes"              
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        <button className='pt-[2rem]'
                            type="button"
                            onClick={()=> navigate("/new-company")}
                            >
                            <IoIosAddCircle className="w-[1.5rem] h-[1.5rem] mdw-[2rem] md:h-[2rem] text-blue-500"/>
                        </button>
                    </div> 

                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-col'>
                            <label for="status" class="form-label">Stato</label>
                            <select
                                class="form-select"
                                name="status"
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                className='max-w-[8rem] md:max-w-35 border rounded p-1 bg-white'
                                >
                                <option selected>Seleziona</option>    
                                    <>
                                        <option value="Attivo">Attivo</option>
                                        <option value="Chiuso">Chiuso</option>
                                        <option value="In attesa">In attesa</option>
                                        <option value="Perso">Perso</option>
                                    </>                                   
                                </select>
                        </div>     
                    </div>
                   <div className='flex flex-col gap-1'>
                        <label for="start_date" class="form-label">Inizio</label>
                        <input
                            class="form-class"
                            id='start_date'
                            type="date"
                            name="start_date"
                            placeholder="01/01/2001"
                            required
                            value={startDate}
                            onChange={(e)=> setStartDate(e.target.value)}
                            className='max-w-[8rem] md:max-w-35 border rounded p-1 bg-white'
                        />
                    </div>                
                    <label for="end_date" class="form-label">Fine</label>
                        <input
                            class="form-class"
                            id='end_date'
                            type="date"
                            name="end_date"
                            placeholder="01/01/2001"
                            value={endDate}
                            onChange={(e)=> setEndDate(e.target.value)}
                            className='max-w-[8rem] md:max-w-35 border rounded p-1 bg-white'     
                        />

                    <div className='flex flex-col gap-1'>
                        <label for="budget" class="form-label">Budget €</label>
                        <input
                            id='budget'
                            className="form-control max-w-[8rem] md:max-w-35"
                            type="text"
                            name="budget"
                            placeholder="Budget"
                            value={budget}
                            onChange={(e)=> setBudget(e.target.value)}
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
                            onClick= {()=> navigate(-1)}
                        > 
                            Indietro
                        </button>
                    </div> 
                </form>
            </div>
            <MsgSuccess state={showConfirm} subject={"nuovo-progetto"}/>
            <MsgDeny state={showDeny} subject={"nuovo-progetto"}/>
        </>
    );
};

export default NewProject;
