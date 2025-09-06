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
                } finally {
                    setLoader(false);
                }
            };
            fetchSingleProject();
        } else {
            setProject("Dati non disponibili");
        }
    }, [id]);

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
                    <th scope="col">Opzioni</th>
                    </tr>
                <tbody>   
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.company_name}</td>
                    <td>{project.status}</td>
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                    <td>
                        <button>
                        <AiTwotoneDelete/>
                        </button>
                        <button>
                        <FaPen/>
                        </button>
                    </td>  
                </tbody>
            </table>
        )}
        <button
            type="button"
            onClick={ (e)=> navigate ("/projects")}
        >
            Indietro
        </button>
        </>
    )
}



export default ProjectView;