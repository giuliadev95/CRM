import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Global/BreadCrumb';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import '@styles/app.css';

const UpdateCompany = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [company_type, setCompanyType] = useState("");
    const [notes, setNotes] = useState("");
    const [companyDetails, setCompanyDetails] = useState(null);
    const navigate = useNavigate();

    const breadCrumbitems= [
        {label : "Home", href:"/"},
        {label : "Aziende", href:"/companies"},
        {label: companyDetails, href:"#", onClick:(e)=> {
            e.preventDefault();
            navigate(-1);
            } 
        },
        {label: "Modifica"}
    ]

 
    // 1. Fetch the company's data basing on the { id }, that is a req. param, before updating its fields
    useEffect(() => {
        fetch(`http://localhost:3000/api/company/get/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setName(data.name || "");
                const fullName = data.name;
                setCompanyDetails(fullName);
                setPhone(data.phone || "");
                setEmail(data.email || "");
                setWebsite(data.website || "");
                setCompanyType(data.company_type || "");
                setNotes(data.notes || "");
            })
            .catch((err) => console.error(err));
    }, [id]);

    // Force the page to be viewd from the top, because by default I see it starting from the H2, leaving the BreadBrumb off sigth.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    Modifica azienda
                </h2>
                <form 
                    className='max-w-[80%] md:max-w-[50%] flex flex-col gap-3 md:gap-6'
                    onSubmit={handleUpdate}>
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
                            placeholder="Website"
                            required
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
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

export default UpdateCompany;