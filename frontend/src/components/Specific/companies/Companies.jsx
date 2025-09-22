// Contacts.jsx
import React from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";

const Companies = ({ companies, loading }) => { 
  // constants I need, moved here  rom the ContactsList.jsx component
  const [input, setInput] = useState("");
  const [filteredCompanies, setFilteredCompanies]= useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
    
    try {
      const res = await axios.get("http://localhost:3000/api/companies/search/company", {
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
    return <h2>Loading...</h2>;
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
              <th scope="d-none d-md-table-cell">Email</th>
              <th className="d-none d-md-table-cell" scope="col">Telefono</th>
              <th className="d-none d-md-table-cell" scope="col">Sito Web</th>
              <th className="d-none d-md-table-cell" scope="col">Tipo</th>
              <th className="d-none d-md-table-cell" scope="col">Dettagli</th>
              <th className="d-none d-md-table-cell" scope="col"></th>
            </tr>
          </thead>
          {/* Map the fetched contacts to display each of them in a table row */}
          <tbody>
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
              <tr key={company.id_company}>
                <td className="hover:underline cursor-pointer">{company.name}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{company.email}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{company.phone}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{company.website}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{company.company_type}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{company.notes || "-"}</td>
                <td>
                  <div  
                      className="bg-transparent border-none shadow-none p-0 m-0 outline-none">
                      <BsThreeDotsVertical/>
                  </div>
                </td>
              </tr>
              ))
              ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  Nessuna azienda presente
                </td>
              </tr>
            )}
        </tbody>
    </table>
  </div>
  );
};

export default Companies;