import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai"; // bin icon to delete a contact
import { FaPen } from "react-icons/fa"; // pen to update a contact
import { IoMdEye } from "react-icons/io";
import Companies from "@/components/Specific/Companies";
import Pagination from "@/components/Global/Pagination";
import ExportPDF_companies from "@/components/Specific/ExportPDF_companies";
import Breadcrumb from "@/components/Global/BreadCrumb";
import '@/styles/app.css';

export default function CompaniesList() {
  
  const [companies, setCompanies] = useState([]);
  const [input, setInput] = useState("");         
  const [searchTerm, setSearchTerm] = useState("");
  // setError
  const [theError, setTheError] = useState(null);

  // Set loader
  const [loading, setLoading] = useState(false);

  // Set initial page
  const [page, setPage] = useState(1);
  const [companiesPerPage] = useState(10);

  // BreadCrumb items imported from breadCrumb.jsx
  const breadCrumbitems= [
      { label: "Home", href: "/" },
      {label: "Aziende"}
  ]

  const navigate = useNavigate();

    // useEffect to fetch the contacts from the PostgreSQL database, and to set the Loader
       useEffect(()=> {
        const fetchCompanies = async()=> {
            try{
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/companies/get");
                console.log(response)
                console.log(response.data)
                // The fetched data update the content of the contact variable. This happens even after the deletion of a single contact.
                setCompanies(response.data);
    
                // EXPECTED OUTPUT: [ An array of objects { }, { },... ] , "object".
                console.log(response.data, typeof response.data);
                setLoading(false);

            } catch(error){
                 if(error.response && error.response.status === 404) {
                        setTheError("Companies not found");
                        console.error(error);
                    } else {
                        setTheError("Error.")
                    }
                    console.error(`Error fetching the companies with the axios get method: ${error}`);
                    console.log(theError);
            } finally {
                setLoading(false);
            }              
        };
        fetchCompanies();
    },[]);

// Filter companies' names when you press the Search button
  const filteredCompanies = companies.filter((company) => {
  const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
  const normalizedName = company?.name?.toLowerCase().replace(/\s+/g, '');
  return normalizedName.includes(normalizedSearch);
});

 // Get current contacts
  const indexOfLastContact = page * companiesPerPage;
  const indexOfFirstContact = indexOfLastContact - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstContact, indexOfLastContact);
  const paginate = (number) => setPage(number);

  function handleSubmit(e) {
  e.preventDefault();
  // Sanitize input with regex: trims whitespaces and Lowercases everything
  const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
  setSearchTerm(cleanedInput);
  }

  // Open the page to create a new company
  function openForm() {
      navigate("/new-company")
  }

 return (
      <>  
        <div className="mx-8">
            <Breadcrumb items={breadCrumbitems}
            />
            <div className="flex flex-col md:flex md:flex-row md:justify-between">
                <h1 className="h2">Aziende</h1>
                <div className="flex md:gap-2 justify-start gap-4 md:justify-between items-center my-4 md:hidden">
                    <button 
                        type="button" 
                        class="btn btn-primary" 
                        onClick={()=> openForm()}
                    >
                        Nuovo
                    </button>
                    <ExportPDF_companies contacts={companies}/>
                </div>
                <div className="hidden md:flex gap-4 justify-between items-center mb-2">
                    <button 
                        type="button" 
                        class="btn btn-primary" 
                        onClick={()=> openForm()}
                    >
                        Nuovo
                    </button>
                    <ExportPDF_companies companies={companies}/>
                </div>
            </div>
        </div>
        <div className="mx-8">
            <Companies
                companies={currentCompanies} loading={loading}
            />
            <Pagination
                recordsPerPage={companiesPerPage} totalRecords={companies.length} paginate={paginate}
            />
        </div>
      </>
    );
}
