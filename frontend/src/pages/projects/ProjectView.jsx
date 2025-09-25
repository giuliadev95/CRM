import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExportPDF_project from "@/components/Specific/ExportPDF/ExportPDF_project_details";
import Breadcrumb from "@/components/Global/BreadCrumb";
import View from "@/components/Global/View";

const ProjectView=()=>{
    const [project, setProject] = useState([]);
    const {id} = useParams();
    const [showConfirm, setShowConfirm] = useState(false); // dont's show the pop-up msg by default
   
    const navigate = useNavigate();

    // BreadCrumb items imported from breadCrumb.jsx
    const breadCrumbitems= [
        { label: "Home", href: "/" },
        { label: "Progetti", href:"/projects"},
        {label: "Dettagli"}
    ]
 
    useEffect(()=>{
        if(id){
            const fetchSingleProject = async()=> {
                try {
                        const response = await axios.get(`http://localhost:3000/api/project/get/${id}`)
                        console.log(response)
                        console.log(response.data)
                        setProject(response.data)
                } catch(error) {
                    if(error.response && error.response.status === 404) {
                        console.error(`404 Not found: ${error}`);
                    } else {
                        console.error("Si è verificato un errore, riprova: ", error)
                    }
                    console.error(`Error fetching the project with the id ${id}: ${error}`);
                    console.log(error);
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
        setShowConfirm(false);
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
            <div className="mx-8">
                <Breadcrumb items={breadCrumbitems}/>
            </div>
            {project ? (
                <div className="max-w-xl">
                    {/* Display the View component */ }
                    <View 
                        avatar={"project"}
                        title={project.name}
                        fields={[
                            {
                                label: "Nome",
                                value: project.name
                            },
                            {
                                label: "Azienda",
                                value: project.company_name
                            },
                            {
                                label: "Status",
                                value: project.status
                            },
                            {
                                label: "Budget",
                                value: project.budget
                            },
                            {
                                label: "Inizio",
                                value: formatDate(project.start_date) 
                            },
                            {
                                label: "Fine",
                                value: formatDate(project.end_date)
                            },
                            {
                                label: "Dettagli",
                                value: project.description
                            }
                        ]}
                    /> 
                    {/* Display the 3 buttons: Export, Edit, Delete */ }
                    <div className="mx-8 flex flex-col sm:flex-row gap-3 md:gap-0 max-w-fit justify-center ">
                        <ExportPDF_project project={project}/>
                        <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() => openProjectPage(project.id_project)}
                            >
                                Modifica
                        </button>
                        <button
                            class="btn btn-danger"
                            type="button"
                            onClick={()=> setShowConfirm(true)} // pop-up opening
                        >
                            Elimina
                        </button>
                    </div>
                </div>
                ) : (
                    <tr>
                        <td colSpan={5} style={{ textAlign: "center" }}>
                            Nessuna azienda trovata
                        </td>
                    </tr>
                )
            }
             {/* Pop up msg to ask the user if he wants to delete the Company */}         
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
                                    onClick={()=> deleteProject(project.id_project)} // delete the project and navigate back of 1 page
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
        </>
    )
}

export default ProjectView;