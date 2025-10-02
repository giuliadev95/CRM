import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import Breadcrumb from '@/components/Global/BreadCrumb';
import MsgSuccess from '@/components/Global/MsgSuccess';
import MsgDeny from '@/components/Global/MsgDeny';
import '@styles/app.css';

const UpdateProject = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [status, setStatus] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget]= useState("");
    const [companies, setCompanies] = useState([]);
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectStatusSelect, setProjectStatusSelect] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false); // dont's show the pop-up msg by default
    const [showDeny, setShowDeny] = useState(false); // dont's show the pop-up msg by default

    const breadCrumbitems= [
        {label : "Home", href:"/"},
        {label : "Progetti", href:"/projects"},
        {label: projectDetails, href:"#", onClick:(e)=> {
            e.preventDefault();
            navigate(-1);
            } 
        },
        {label: "Modifica"}
    ]
    const navigate = useNavigate();
    
    // FETCH PROJECT DATA
    useEffect(() => {
        fetch(`http://192.168.1.3:3000/api/project/get/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const projectName = (data.name);
            const projectStatus = (data.status);
            setProjectStatusSelect(projectStatus);
            setProjectDetails(projectName);
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

    // FETCH COMPANIES
    useEffect(() => {
        fetch("http://192.168.1.3:3000/api/companies/get")
            .then((res) => res.json())
            .then((data) => setCompanies(data))
            .catch((err) => console.error("There was an error in fetching the companies: ", err));
    }, []);

    // Force the page to be viewd from the top, because by default I see it starting from the H2, leaving the BreadBrumb off sigth.
    useEffect(() => {
        window.scrollTo(0, 0);
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
            const res =await axios.put(
                `http://192.168.1.3:3000/api/project/update/${id}`, 
                updatedProject, 
                {
                    headers: { 'Content-Type': 'application/json' },      
                }
            );
            console.log(res)
            setShowConfirm(true);
            setTimeout(()=> {
                setShowConfirm(false);
                navigate(-1);
            }, 1200); 
        } catch (error) {
                console.error("Error:", error);
                setShowDeny(true);
                setTimeout(()=> {
                    setShowDeny(false);
                    navigate(-1);
                }, 1200);
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
                    <IoMdArrowRoundBack/>{" Indietro"}
                </button> 
                <h2 className='flex gap-2'> 
                    <FaEdit /> 
                    Modifica progetto
                </h2>
                <form 
                    className='max-w-[80%] md:max-w-[50%] flex flex-col gap-3 md:gap-6'
                    onSubmit={handleUpdate}
                >
                <div className='flex flex-col gap-1'>
                    <label for="name" class="form-label">Nome</label>
                    <input
                        id='name'
                        class="form-control"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                    <div className='flex flex-col gap-1'>
                    <label for="description" class="form-label">Descrizione</label>
                    <textarea
                        id='description'
                        class="form-control"
                        type="text"
                        name="description"
                        placeholder="Write down the project's details"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex flex-col gap-1'>
                        <label for="company" class="form-label">Azienda</label>
                        <select
                            className="form-select"
                            id="company"
                            name="company"
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
                                <option selected>{projectStatusSelect}</option>
                                {
                                    projectStatusSelect === "Attivo"? (
                                        <>
                                            <option value="Chiuso">Chiuso</option>
                                            <option value="In attesa">In attesa</option>
                                            <option value="Perso">Perso</option>
                                        </>    
                                    ) :  projectStatusSelect === "Chiuso"? (
                                        <>
                                            <option value="Attivo">Attivo</option>
                                            <option value="In attesa">In attesa</option>
                                            <option value="Perso">Perso</option>
                                        </>    
                                    ) :  projectStatusSelect === "In attesa"? (
                                        <>
                                            <option value="Attivo">Attivo</option>
                                            <option value="Chiuso">Chiuso</option>
                                            <option value="Perso">Perso</option>
                                        </>    
                                    ) : 
                                    <>
                                        <option value="Attivo">Attivo</option>
                                        <option value="In attesa">In attesa</option>
                                        <option value="Chiuso">Chiuso</option>
                                    </>          
                                }
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
                        <label for="budget" class="form-label">Budget</label>
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
                {/* Pop up msg : Project updated successfully */}         
            <MsgSuccess state={showConfirm}/>
                {/* Pop up msg: Impossible to update the project */}      
            <MsgDeny state={showDeny}/>
        </>
    );
};

export default UpdateProject;
