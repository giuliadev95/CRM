import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdEye } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import '@styles/app.css';


const ProjectsList =()=>{
  const [projects, setProjects] = useState([]);

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
  
  useEffect(()=>{
    getProjects()
  }, []);

  const navigate = useNavigate();
  const openProjectView = (id) => {
    navigate(`/project-view/${id}`)
  };

  return(
    <>
      <table>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrizione</th>
            <th scope="col">Azienda</th>
            <th scope="col">Status</th>
            <th scope="col">Data inizio</th>
            <th scope="col">Data fine</th>
            <th scope="col">Opzioni</th>
          </tr>
        <tbody>     
        {projects.map((project)=> {
          return(
            <tr key={project.id_project}>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.company_name}</td>
            <td>{project.status}</td>
            <td>{project.start_date}</td>
            <td>{project.end_date}</td>
            <td>
              <button
              type="button"
              onClick={()=> openProjectView(project.id_project)}
              >
                <IoMdEye/>
              </button>
              <button>
                <AiTwotoneDelete/>
              </button>
              <button>
                <FaPen/>
              </button>
            </td>
          </tr>
        )
      })}
      </tbody>
      </table>
    </>
  )
};

export default ProjectsList;