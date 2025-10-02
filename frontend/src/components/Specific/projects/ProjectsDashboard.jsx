import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const ProejctsDasboard =()=> {

    // use navigate
    const navigate = useNavigate();

    // Store all contacts fetched from the PostgreSQL database 
    const [ projects, setProjects ] = useState([]);

    useEffect(()=> {
        const fetchProjects = async()=> {
            try{             
                const response = await axios.get("http://192.168.1.3:3000/api/projects/get");
                console.log(response)
                console.log(response.data)
                // The fetched data update the content of the project variable. This happens even after the deletion of a single project.
                setProjects(response.data);
    
                // EXPECTED OUTPUT: [ An array of objects { }, { },... ] , "object".
                console.log(response.data, typeof response.data); 

            } catch(error) {
                if(error.response && error.response.status === 404) {
                    console.error(error);
                    console.log(`404 - Projects not found: ${error}`);
                } else {
                    console.error(error);
                    console.log(error);
                }
                console.error(`Error fetching the projects with the axios get method: ${error}`);
                console.log(error); 
            };
        };
        fetchProjects();        
    }, [])

    const activeProjects = projects.filter((project)=> project.status === "Attivo");
    const closedProjects = projects.filter((project)=> project.status === "Chiuso")
    const pendingProjects = projects.filter((project)=> project.status === "In attesa")
    const lostProjects = projects.filter((project)=> project.status === "Perso")

    return(
        <>
            <div className="flex flex-col gap-3">
                <div className="w-full h-64 ">
                        <Bar
                            data={{
                                labels: ["Attivi", "Chiusi", "In attesa", "Persi"],
                                datasets: [{
                                    label: "Progetti",
                                    data: [
                                        activeProjects.length, 
                                        closedProjects.length, 
                                        pendingProjects.length,
                                        lostProjects.length 
                                    ],
                                }],
                            }}
                            options={{
                                maintainAspectRatio: false, // permette al container di controllare l'altezza
                            }}
                        />
                </div>
            <button 
                type="button" 
                className=" btn btn-dark w-fit"
                onClick={()=> navigate("/projects")}
            >
                Vai ai Progetti
            </button>
            </div>  
        </>
    )
}

export default ProejctsDasboard;
