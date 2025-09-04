import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai"; // bin icon to delete a contact
import { FaPen } from "react-icons/fa"; // pen to update a contact
import { IoMdEye } from "react-icons/io";
import '@/styles/app.css';

export default function ProjectssList() {
  
  const [projects, setProjects] = useState([]);
  const [input, setInput] = useState("");         
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch projects: get
  useEffect(() => {
    fetch("http://localhost:3000/api/companies/get")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => console.error(`There was an error fetching the companies: ${err}`));
  }, []);

// Filter companies' names when you press the Search button
  const filteredCompanies = companies.filter((company) => {
  const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
  const normalizedName = company?.name?.toLowerCase().replace(/\s+/g, '');
  return normalizedName.includes(normalizedSearch);
});

function handleSubmit(e) {
  e.preventDefault();
  // Sanitize input with regex: trims whitespaces and Lowercases everything
  const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
  setSearchTerm(cleanedInput);
}

// Delete company
function deleteCompany(id) {
    if (!id) return console.error("The ID is missing to perform the deletion.");

    fetch(`http://localhost:3000/api/company/delete/${id}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) throw new Error("Error during the deletion.");
        console.log(`Contact with ID: ${id} deleted successfully.`);
        // Avoid mapping and filtering the deleted company, as its ID will be missing.
        setCompanies(companies.filter((company) => company.id_company !== id));

    })
    .catch((err) => console.error(`Error: ${err}`));
  }

      // Open the page to create a new company
    function openForm() {
        navigate("/new-company")
    }

    // Open the page to update the contact
    const openCompanyPage = (id) => {
        navigate(`/update-company/${id}`);
    }

    const openCompanyView = (id) => {
        navigate(`/company-view/${id}`);
    }

  return (
    <>
    <div class="top-actions-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome azienda"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Cerca</button>
      </form>
      <button
        type='button'
        onClick={ ()=> openForm()}
      >
        + New
      </button>
    </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Sito web</th>
            <th>Tipologia</th>
            <th>Dettagli</th>
            <th>Opzioni</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <tr key={company.id_company}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.phone}</td>
                <td>{company.website}</td>
                <td>{company.company_type}</td>
                <td>{company.notes}</td>

                <td class="actions-button-container"> 
                  {/* View single contact's page button that calls the delete function */}
                  <button
                  type="button"
                  class="actions-button"
                  onClick={ ()=> openCompanyView(company.id_company) }
                  >
                  <IoMdEye/>
                  </button>   
                  {/* Delete button that calls the delete function */}
                  <button
                  type="button"
                  class="actions-button"
                  onClick={ ()=> deleteCompany(company.id_company) }
                  >
                  <AiTwotoneDelete/>
                  </button>   

                  {/* Update button that calls the update function */}
                  <button
                  type="button"
                  class="actions-button"
                  onClick={ ()=> openCompanyPage(company.id_company) }
                  >
                  <FaPen/>
                  </button>         
                </td>      
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Nessuna azienda trovata
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
