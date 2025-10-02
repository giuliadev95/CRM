import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Global/BreadCrumb";
//import TotalCompaniesCard from "@/components/Specific/companies/TotalCompaniesCard";
import ProjectsDasboard from "@/components/Specific/projects/ProjectsDashboard";
import CompaniesDashboard from "@/components/Specific/companies/CompaniesDasboard";
import RecentContacts from "@/components/Specific/contacts/RecentsContacts";
import { MdDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { HiBuildingOffice2 } from "react-icons/hi2";
import '../../styles/app.css';

const Home=()=>{
      
    // BereadCrumb
    const breadCrumbitems= [
    { label: "Home"}
    ];

    return(
        <>
            <div className="mx-8 gap-4">
                <Breadcrumb items={breadCrumbitems}/>     
                <h1 className="h2 flex items-center">{<MdDashboard/>}Dashboard</h1>  
                <div className="mx-8 flex flex-col md:flex-row gap-4">      
                    <div className="lg:w-[50%] mt-4">
                        <h2 className="h3 flex items-center">{<FaProjectDiagram/>}Progetti</h2> 
                        {/** ProjectsDasboard */}
                        <ProjectsDasboard/>              
                    </div>
                    <div className="lg:w-[50%] mt-4">
                        <h2 className="h3 flex items-center">{<HiBuildingOffice2/>}Aziende</h2> 
                        {/** ProjectsDasboard */}
                        <CompaniesDashboard/>              
                    </div>
                </div>
                <div className="mx-8 mt-10">
                   <RecentContacts/>
                </div>
            </div>
        </>
    )
}

export default Home;