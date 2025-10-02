import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Global/BreadCrumb";
//import RecentContacts from "@/components/Specific/contacts/RecentsContacts";
//import TotalCompaniesCard from "@/components/Specific/companies/TotalCompaniesCard";
import ProjectsDasboard from "@/components/Specific/projects/ProjectsDashboard";
import { MdDashboard } from "react-icons/md";
import '../../styles/app.css';

const Home=()=>{
      
    // BereadCrumb
    const breadCrumbitems= [
    { label: "Home"}
    ];

    return(
        <>
            <div className="mx-8">
                <Breadcrumb items={breadCrumbitems}/>     
                <h1 className="h2 flex items-center">{<MdDashboard/>}Dashboard</h1>           
                <div className="lg:w-[50%] mt-4">
                    {/** ProjectsDasboard */}
                    <ProjectsDasboard/>              
                </div>
            </div>
        </>
    )
}

export default Home;