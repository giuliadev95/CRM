import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect to configured routes without refreshing the page thanks to SPA
import Projects from "@/components/Specific/projects/Projects";
import Pagination from "@/components/Global/Pagination";
import ExportPDF_contacts from "@/components/Specific/ExportPDF/ExportPDF_contacts";
import Breadcrumb from "@/components/Global/BreadCrumb";
import '../../styles/app.css';

const ProjectsList = () => {

    // Store all contacts fetched from the PostgreSQL database 
    const [ projects, setProjects ] = useState([]);

    // Set loader
    const [loading, setLoading] = useState(false);

    // Set initial page
    const [page, setPage] = useState(1);
    const [projectsPerPage] = useState(10);

    // BreadCrumb items imported from breadCrumb.jsx
    const breadCrumbitems= [
        { label: "Home", href: "/" },
        {label: "Progetti"}
    ]

    // This constant hooks the "useNavigate()" functionalities to the "navigate" variable
    const navigate = useNavigate();
 
    // useEffect to fetch the contacts from the PostgreSQL database, and to set the Loader
       useEffect(()=> {
        const fetchProjects = async()=> {
            try{
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/projects/get");
                console.log(response)
                console.log(response.data)
                // The fetched data update the content of the project variable. This happens even after the deletion of a single project.
                setProjects(response.data);
    
                // EXPECTED OUTPUT: [ An array of objects { }, { },... ] , "object".
                console.log(response.data, typeof response.data);
                setLoading(false);

            } catch(error){
                if(error.response && error.response.status === 404) {
                        console.error(error);
                        console.log(`404 - Projects not found: ${error}`);
                    } else {
                        console.error(error);
                        console.log(error);
                    }
                    console.error(`Error fetching the projects with the axios get method: ${error}`);
                    console.log(error);
            } finally {
                setLoading(false);
            }              
        };
        fetchProjects();
    },[]);
    
    // Get current contacts
    const indexOfLastContact = page * projectsPerPage;
    const indexOfFirstContact = indexOfLastContact - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstContact, indexOfLastContact);
    const paginate = (number) => setPage(number);

    // Open the page to create a new contact
    function openForm() {
        navigate("/new-project")
    }

    // return:
    return (
        <>  
            <div className="mx-8">
                <Breadcrumb items={breadCrumbitems}
                />
                <div className="flex flex-col md:flex md:flex-row md:justify-between">
                    <h1 className="h2">Project</h1>
                    <div className="flex md:gap-2 justify-start gap-4 md:justify-between items-center my-4 md:hidden">
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            onClick={()=> openForm()}
                        >
                            Nuovo
                        </button>
                        <ExportPDF_contacts contacts={projects}/>
                    </div>
                    <div className="hidden md:flex gap-4 justify-between items-center mb-2">
                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            onClick={()=> openForm()}
                        >
                            Nuovo
                        </button>
                        <ExportPDF_contacts contacts={projects}/>
                    </div>
                </div>
            </div>
            <div className="mx-8">
                <Projects
                    projects={currentProjects} loading={loading}
                />
                <Pagination
                    recordsPerPage={projectsPerPage} totalRecords={projects.length} paginate={paginate}
                />
            </div>
        </>
    );
};

export default ProjectsList;
