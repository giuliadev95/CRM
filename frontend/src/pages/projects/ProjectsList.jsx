import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdEye } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import '@styles/app.css';


const ProjectsList =()=>{
  // Store all projects fetched from the PostgreSQL database
  const [projects, setProjects] = useState([]);

  // Store the search input value and handles the input change
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // This constant hooks the "useNavigate()" functionalities to the "navigate" variable
  const navigate = useNavigate();

  // Function to fetch the projects list from the back-end endpoint, using axios library
  const getProjects = async()=> {
    await axios
    .get('http://localhost:3000/api/projects/get')
    .then(response => {
      console.log(response)
      console.log(response.data)
      setProjects(response.data)
    })
    .catch(error => {console.log(error)})
  };
  // Call the useEffect()
  useEffect(()=>{
    getProjects()
  }, []);

  // Projects filtered by the "Search" bar +
  // Filter projects' names when you press the Search button
  const filteredProjects = projects.filter((project) => {
  const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
  const normalizedName = project?.name?.toLowerCase().replace(/\s+/g, '');
  return normalizedName.includes(normalizedSearch);
  });

  // Function to handle the submit of the "searchbar" form
  function handleSubmit(e) {
  e.preventDefault();
  // Sanitize input with regex: trims whitespaces and Lowercases everything
  const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
  setSearchTerm(cleanedInput);
  }

  // Function to open the page that views a single project
  const openProjectView = (id) => {
    navigate(`/project-view/${id}`)
  };

  // Open the page to create a new project
  function openForm() {
      navigate("/new-project")
  }

  // Open the page to update the project
  const openProjectPage = (id) => {
      navigate(`/update-project/${id}`);
  }

  // Delete project
  function deleteProject(id) {
      if (!id) return console.error("The ID is missing to perform the deletion.");
      console.log(id)
        fetch(`http://localhost:3000/api/project/delete/${id}`, {
        method: "DELETE",
      })
      .then((res) => {
          if (!res.ok) throw new Error("Error during the deletion.");
          console.log(`Project with ID: ${id} deleted successfully.`);
          // Avoid mapping and filtering the deleted contact, as its ID will be missing.
          setProjects(projects.filter((project) => project.id_project !== id));
      })
      .catch((err) => console.error(`Error: ${err}`));
  }

  // Return the jsx body of the page
  return(
    <>
      <div class="top-actions-container">
        <form onSubmit={handleSubmit}>
              {/* Searchbar*/}
              <input 
                type='text' 
                placeholder='Nome progetto'
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
              />   
              <button type="submit">Cerca</button>
          </form>
          {/* Button to open the page that adds a new project */}
            <button 
                type="button"
                onClick={ ()=> openForm()}
                >
                + Nuovo
            </button>
      </div>
      <table>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrizione</th>
            <th scope="col">Azienda</th>
            <th scope="col">Status</th>
          </tr>
        <tbody>  
          {/** Map filtered projects and display them into a table */}
          {filteredProjects.length > 0 ?(
            filteredProjects.map((project)=>(
              <tr key={project.id_project}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.company_name}</td>
                <td>{project.status}</td>
                <td>
                  {/* Open page of the single project - button */}
                  <button
                    type="button"
                    onClick={()=> openProjectView(project.id_project)}
                  >
                    <IoMdEye/>
                  </button>

                  {/* Open page to update the project - button */}
                  <button
                    type="button"
                    onClick={()=> openProjectPage(project.id_project)}
                  >
                    <FaPen/>
                  </button>

                  {/* Delete project - button */}
                  <button
                    type="button"
                    onClick={()=>deleteProject(project.id_project)}
                  >
                    <AiTwotoneDelete/>
                  </button>
                </td>
              </tr>      
            ))
          ): (
            <p>Nessun progetto trovato</p>
          )}  
        </tbody>
      </table>
    </>
  )
};

export default ProjectsList;