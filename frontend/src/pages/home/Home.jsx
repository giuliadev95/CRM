import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "@/components/Global/BreadCrumb";
import RecentContacts from "@/components/Specific/contacts/RecentsContacts";
import TotalCompaniesCard from "@/components/Specific/companies/TotalCompaniesCard";
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
                <div className="flex flex-col md:flex md:flex-row md:justify-between">
                    <h1 className="h2 flex items-center">{<MdDashboard/>}Dashboard</h1>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4">
                    <RecentContacts/>      
                    <TotalCompaniesCard/>
                   
                    <div className="card mt-3 w-[200px] lg:w-fit h-auto ">    
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Progetti attivi</h5>   
                                    <p class="card-text">2</p>
                                    <Link to="/projects" class="btn btn-primary">Vedi tutti</Link>            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;