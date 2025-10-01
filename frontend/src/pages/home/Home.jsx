import React from "react";
import Breadcrumb from "@/components/Global/BreadCrumb";
import { MdDashboard } from "react-icons/md";
import '../../styles/app.css';

const Home=()=>{
     const breadCrumbitems= [
        { label: "Home"}
    ]


    return(
        <>
            <div className="mx-8">
                <Breadcrumb items={breadCrumbitems}/>
                <div className="flex flex-col md:flex md:flex-row md:justify-between">
                    <h1 className="h2 flex items-center">{<MdDashboard/>}Dashboard</h1>
                </div>
                <div className="flex flex-wrap items-baseline justify-start ">
                   <div class="row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Le mie aziende</h5>
                                    <p class="card-text">10</p>
                                    <a href="#" class="btn btn-primary">Vedi tutte</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">I miei contatti</h5>
                                <p class="card-text">3</p>
                                <a href="#" class="btn btn-primary">Esplora lista</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;