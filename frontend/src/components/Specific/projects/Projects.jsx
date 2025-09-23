// Contacts.jsx
import React from "react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";

const Projects = ({ projects, loading }) => { 
  // constants I need, moved here from the ProjectsList.jsx component
  const [input, setInput] = useState("");
  const [filteredProjects, setFilteredProjects]= useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
    
    try {
      const res = await axios.get("http://localhost:3000/api/projects/search/project", {
        params: { q: cleanedInput }, 
      });

      setFilteredProjects(res.data);
    } catch (err) {
      console.error("Error in the query:", err);
    }
  }

   useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  if (loading) {
    return <div class="spinner"></div>
  }

  if (!projects || projects.length === 0) {
    return <p>Nessun progetto trovato</p>;
  }

  // Function to format the data from Iso to the timezone stored in the client's browser
  function formatDate(isoString) {
    if (!isoString) return '';
    // Trasforma in locale 'it-IT' → dd/mm/yyyy
    return new Date(isoString).toLocaleDateString('it-IT');
  }

  return (
    <div>  
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
              <th scope="d-none d-md-table-cell">Azienda</th>
              <th className="d-none d-md-table-cell" scope="col">Status</th>
              <th className="d-none d-md-table-cell" scope="col">Inizio</th>
              <th className="d-none d-md-table-cell" scope="col">Fine</th>
              <th className="d-none d-md-table-cell" scope="col">Budget €</th>
              <th className=""></th>
            </tr>
          </thead>
          {/* Map the fetched projects to display each of them in a table row */}
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
              <tr key={project.id_project}>
                <td className="hover:underline cursor-pointer">{project.name}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{project.company_name || "-"}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{project.status || "-"}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">
                    {
                      project.start_date && formatDate(project.start_date)
                      ? formatDate(project.start_date)
                      : "Non disponibile"
                    }
                  </td>
                  <td>
                    {
                      project.end_date && formatDate(project.end_date)
                      ? formatDate(project.end_date)
                      : "Non disponibile"
                    }
                    </td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer">{project.budget || "-"}</td>
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
                  Nessun progetto presente
                </td>
              </tr>
            )}
        </tbody>
    </table>
  </div>
  );
};

export default Projects;