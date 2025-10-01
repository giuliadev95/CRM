import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Companies from "@/components/Specific/companies/Companies";
import Pagination from "@/components/Global/Pagination";
import ExportPDF_companies from "@/components/Specific/ExportPDF/ExportPDF_companies";
import Breadcrumb from "@/components/Global/BreadCrumb";
import '@styles/app.css';
export default function CompaniesList() {
  
    // Store all companies fetched from the PostgreSQL database 
    const [companies, setCompanies] = useState([]);

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

    // Hook the "useNavigate()" functionalities to the "navigate" variable
    const navigate = useNavigate();

    // useEffect to fetch the companies from the PostgreSQL database, and to set the Loader
       useEffect(()=> {
        const fetchCompanies = async()=> {
            try{
                setLoading(true);
                const response = await axios.get("http://192.168.1.3:3000/api/companies/get");
                console.log(response)
                console.log(response.data)
                // The fetched data update the content of the company variable. This happens even after the deletion of a single company.
                setCompanies(response.data);
    
                // EXPECTED OUTPUT: [ An array of objects { }, { },... ] , "object".
                console.log(response.data, typeof response.data);
                  // Set a 2 secs timeout, during which the Loader must fire
                setTimeout(()=> {
                    setLoading(false);
                }, 1000);  

            } catch (error) {
                if(error.response && error.response.status === 404) {
                    console.error(error);
                    console.log(`404 - Companies not found: ${error}`);
                } else {
                    console.error(error);
                    console.log(error);
                }
                console.error(`Error fetching the companies with the axios get method: ${error}`);
                console.log(error);
                // Set a 2 secs timeout, during which the Loader must fire
                setTimeout(()=> {
                    setLoading(false);
                }, 1000);       
            }   
        };
        fetchCompanies();
},[]);


// Get current companies
const indexOfLastContact = page * companiesPerPage;
const indexOfFirstContact = indexOfLastContact - companiesPerPage;
const currentCompanies = companies.slice(indexOfFirstContact, indexOfLastContact);
const paginate = (number) => setPage(number);

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
