import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

const ProjectView=()=>{
    const [project, setProject] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();
 
    useEffect(()=>{
        if(id){
            setLoader(true);
            setError(null);
            const fetchSingleProject = async()=> {
                try {
                        const response = await axios.get(`http://localhost:3000/api/project/get/${id}`)
                        console.log(response)
                        console.log(response.data)
                        setProject(response.data)
                } catch(error) {
                    if(error.response && error.response.status === 404) {
                        setError("Progetto non trovato")
                    } else {
                        setError("Si è verificato un errore, riprova.")
                    }
                    console.error(`Error fetching the project with the id ${id}: ${error}`);
                    console.log(error);
                } finally {
                    setLoader(false);
                }
            };
            fetchSingleProject();
        } else {
            setProject("Dati non disponibili");
        }
    }, [id]);

    // Function to delete the project
    function deleteProject(id) {
        if (!id) return console.error("The ID is missing to perform the deletion.");
        fetch(`http://localhost:3000/api/project/delete/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Error during the deletion.");
            navigate("/projects"); // Navigate back to the Homepage
        })
        .catch((err) => console.error(`Error: ${err}`));
    }

    // Function to format the data from Iso to the timezone stored in the client's browser
    function formatDate(isoString) {
    if (!isoString) return '';
    // Trasforma in locale 'it-IT' → dd/mm/yyyy
    return new Date(isoString).toLocaleDateString('it-IT');
    }

    // Navigate to the "Update Project" page, to update it
    const openProjectPage = (id) => {
        navigate(`/update-project/${id}`);
    }

    // return the JSX content
    return(
        <>
        { loader? (
            <p>Caricamento...</p>
        ): error? (
            <p style={{color: "red"}}>{error}</p>
        ) : (
            <table>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrizione</th>
                    <th scope="col">Azienda</th>
                    <th scope="col">Status</th>
                    <th scope="col">Data inizio</th>
                    <th scope="col">Data fine</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Opzioni</th>
                    </tr>
                <tbody>   
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.company_name}</td>
                    <td>{project.status}</td>
                    <td>
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
                    <td>{project.budget}</td>
                    <td>
                        <button
                            type="button"   
                            onClick={()=> deleteProject(project.id_project)} 
                        >
                            <AiTwotoneDelete/>
                        </button>
                        <button
                            type="button"
                            onClick={ (e)=> openProjectPage(project.id_project)}
                        >
                            <FaPen/>
                        </button>
                    </td>  
                </tbody>
            </table>
        )}
        <button
            type="button"
            onClick={ ()=> navigate ("/projects")}
        >
            Indietro
        </button>
        </>
    )
}



export default ProjectView;