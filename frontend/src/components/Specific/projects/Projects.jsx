import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Projects = ({ projects, loading }) => { 
  // constants I need, moved here from the ProjectsList.jsx component
  const [input, setInput] = useState("");
  const [filteredProjects, setFilteredProjects]= useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [projectToDelete, setProjectDelete] = useState(null);
  
  // This constant hooks the "useNavigate()" functionalities to the "navigate" variable
  const navigate = useNavigate();

  // Open the page to update the project
  const openProjectPage = (id) => {
    navigate(`/update-project/${id}`);
  }

  const openProjectView = (id) => {
    navigate(`/project-view/${id}`);
  }
  
  // Delete project
  function deleteProject(id) {
    if (!id) return console.error("The ID is missing to perform the deletion.");

    fetch(`http://192.168.1.3:3000/api/project/delete/${id}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (!res.ok) throw new Error("Error during the deletion.");
        console.log(`Contact with ID: ${id} deleted successfully.`);
        // Avoid mapping and filtering the deleted contact, as its ID will be missing.
        setFilteredProjects(projects.filter((project) => project.id_project !== id));
    })
    .catch((err) => console.error(`Error: ${err}`));
    setShowConfirm(false);
  }

  // Function to handle the Search query
  async function handleSubmit(e) {
    e.preventDefault();
    const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
    
    try {
      const res = await axios.get("http://192.168.1.3:3000/api/projects/search/project", {
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
              <th className="d-none d-md-table-cell"></th>
            </tr>
          </thead>
          {/* Map the fetched projects to display each of them in a table row */}
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
              <tr key={project.id_project}>
                <td className="hover:underline cursor-pointer" onClick={() => openProjectView(project.id_project)}>{project.name}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={() => openProjectView(project.id_project)}>{project.company_name || "-"}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={() => openProjectView(project.id_project)}>{project.status || "-"}</td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={() => openProjectView(project.id_project)}>
                  {
                    project.start_date && formatDate(project.start_date)
                    ? formatDate(project.start_date)
                    : "Non disponibile"
                  }
                </td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={() => openProjectView(project.id_project)}>
                  {
                    project.end_date && formatDate(project.end_date)
                    ? formatDate(project.end_date)
                    : "Non disponibile"
                  }
                  </td>
                <td className="d-none d-md-table-cell hover:underline cursor-pointer" onClick={() => openProjectView(project.id_project)}>{project.budget || "-"}</td>
                <td>
                  <button  
                    onClick={() => openProjectPage(project.id_project)}
                    className="bg-transparent border-none shadow-none p-0 m-0 outline-none"
                  >
                    <MdModeEdit />
                  </button>
                  <button  
                    onClick={() => {
                        setProjectDelete(project.id_project)
                        setShowConfirm(true)
                      }
                    }
                    className="bg-transparent border-none shadow-none p-0 m-0 outline-none"
                  >
                    <MdDelete />
                  </button>
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
     {/** Pop-up msg */}
    {showConfirm && (
      <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-lg">
                  Eliminare il progetto definitivamente?
              </p>
              <div className="flex gap-4 justify-center">
                  <button 
                      className="btn btn-danger"
                      onClick={()=> deleteProject(projectToDelete)} // delete the company and navigate back of 1 page
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
  </div>
  );
};

export default Projects;