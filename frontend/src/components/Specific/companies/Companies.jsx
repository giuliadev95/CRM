// Contacts.jsx
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Companies = ({ companies, loading }) => { 
  // constants I need, moved here  rom the ContactsList.jsx component
  const [input, setInput] = useState("");
  const [filteredCompanies, setFilteredCompanies]= useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  // Navigation among pages
  const navigate= useNavigate();

  // Open the page to open the single company's update page
  const openCompanyPage = (id) => {
      navigate(`/update-company/${id}`);
  }
  // Function to open the single company's view
  const openCompanyView = (id) => {
      navigate(`/company-view/${id}`);
  }

// Delete company
  function deleteCompany(id) {
    if (!id) return console.error("The ID is missing to perform the deletion.");
        fetch(`http://192.168.1.3:3000/api/company/delete/${id}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) throw new Error("Error during the deletion.");
        console.log(`Company with ID: ${id} deleted successfully.`);
        // Avoid mapping and filtering the deleted contact, as its ID will be missing.
        setFilteredCompanies(companies.filter((company) => company.id_company !== id));
    })
    .catch((err) => console.error(`Error: ${err}`));
    setShowConfirm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
    
    try {
      const res = await axios.get("http://192.168.1.3:3000/api/companies/search/company", {
        params: { q: cleanedInput }, 
      });

      setFilteredCompanies(res.data);
    } catch (err) {
      console.error("Error in the query:", err);
    }
  }

   useEffect(() => {
    setFilteredCompanies(companies);
  }, [companies]);

  if (loading) {
    return <div class="spinner"></div>
  }

  if (!companies || companies.length === 0) {
    return <p>Nessuna azienda trovata</p>;
  }

  return (
    <div>  
      {/* Insert Ref here, so it prints this table */}
      <table className="table border table-hover">
          <thead>
            <tr>
              <td colspan="100">
                  <form class="d-flex w-100"onSubmit={handleSubmit} >
                      <input 
                          class="form-control me-2 w-100" 
                          type="search" 
                          placeholder="Cerca" 
                          aria-label="Search"  
                          value={input}
                          onChange={(e)=> setInput(e.target.value)}         
                      />
                      <button class="btn btn-light border border-secondary " type="submit">Cerca</button>                 
                  </form>  
              </td>
            </tr>
            <tr>
              <th scope="col">Nome</th>
              <th className="d-none d-md-table-cell" scope="col">Email</th>
              <th className="d-none d-md-table-cell" scope="col">Telefono</th>
              <th className="d-none d-md-table-cell" scope="col">Sito Web</th>
              <th className="d-none d-md-table-cell" scope="col">Tipo</th>
              <th></th>
            </tr>
          </thead>
          {/* Map the fetched contacts to display each of them in a table row */}
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
              <tr key={company.id_company}>
                <td className="hover:underline cursor-pointer" onClick={()=> {openCompanyView(company.id_company)}}>{company.name}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={()=> {openCompanyView(company.id_company)}}>{company.email || "-"}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={()=> {openCompanyView(company.id_company)}}>{company.phone || "-"}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={()=> {openCompanyView(company.id_company)}}>{company.website || "-"}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={()=> {openCompanyView(company.id_company)}}>{company.company_type || "-"}</td>
                  <td className="hover:underline cursor-pointer"> 
                    <button 
                      onClick={()=> openCompanyPage(company.id_company)}
                      className="bg-transparent border-none shadow-none p-0 m-0 outline-none"
                    >
                      <MdModeEdit/>
                    </button>
                    <button 
                      onClick={ ()=> {
                        setCompanyToDelete(company.id_company)
                        setShowConfirm(true)
                        }
                      }
                      className="bg-transparent border-none shadow-none p-0 m-0 outline-none"
                    >
                      <MdDelete/>
                    </button>
                  </td>
              </tr>
              ))
              ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  Nessuna azienda presente
                </td>
              </tr>
            )
          }
        </tbody>
    {/** Pop-up msg */}
    {showConfirm && (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-lg">
                  Eliminare l'azienda definitivamente?
              </p>
              <div className="flex gap-4 justify-center">
                  <button 
                      className="btn btn-danger"
                      onClick={()=> deleteCompany(companyToDelete)} // delete the company and navigate back of 1 page
                  >
                      Sì
                  </button>
                  <button 
                      className="btn btn-secondary"
                      onClick={() => setShowConfirm(false)} // just close the pop-up
                  >
                      No
                  </button>
              </div>
          </div>
        </div>
      </>
    )}
    </table>

  </div>
  );
};

export default Companies;