import React from "react";
import Breadcrumb from "@/components/Global/BreadCrumb";
import { MdDashboard } from "react-icons/md";
import RecentContacts from "@/components/Specific/contacts/RecentsContacts";
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
                <RecentContacts/>      
            </div>
        </>
    )
}

export default Home;