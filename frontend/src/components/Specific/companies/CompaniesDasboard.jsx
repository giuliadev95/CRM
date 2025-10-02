import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";


function CompaniesDashboard() {
  // use navigate
    const navigate = useNavigate();

    // Store all contacts fetched from the PostgreSQL database 
    const [ companies, setCompanies ] = useState([]);

    useEffect(()=> {
        const fetchProjects = async()=> {
            try{             
                const response = await axios.get("http://192.168.1.3:3000/api/companies/get");
                console.log(response)
                console.log(response.data)
                // The fetched data update the content of the companies variable. 
                setCompanies(response.data);
    
                // EXPECTED OUTPUT: [ An array of objects { }, { },... ] , "object".
                console.log(response.data, typeof response.data); 

            } catch(error) {
                if(error.response && error.response.status === 404) {
                    console.error(error);
                    console.log(`404 - Companies not found: ${error}`);
                } else {
                    console.error(error);
                    console.log(error);
                }
                console.error(`Error fetching the companies with the axios get method: ${error}`);
                console.log(error); 
            };
        };
        fetchProjects();        
    }, [])

    // 'Supplier', 'Partner', 'Client', 'Prospect', 'Seller', 'Buyer', 'Assurance'

    const supplier = companies.filter((company)=> company.company_type === "Supplier");
    const partner = companies.filter((company)=> company.company_type === "Partner");
    const client = companies.filter((company)=> company.company_type === "Client");
    const prospect = companies.filter((company)=> company.company_type === "Prospect");
    const seller = companies.filter((company)=> company.company_type ==="Seller");
    const buyer = companies.filter((company)=> company.company_type === "Buyer");
    const assurance = companies.filter((company)=> company.company_type === "Assurance");

    return(
        <>
            <div className="flex flex-col gap-3">
                <div className="w-full h-64 ">
                        <Doughnut
                            data={{
                                labels: ['Fornitori', 'Partner', 'Clienti', 'Prospect', 'Venditori', 'Compratori', 'Assicurazioni'],
                                datasets: [{
                                    label: "Aziende",
                                    data: [
                                        supplier.length, 
                                        partner.length, 
                                        client.length,
                                        prospect.length,
                                        seller.length, 
                                        buyer.length, 
                                        assurance.length, 
                                    ],
                                }],
                            }}
                            options={{
                                maintainAspectRatio: false,
                            }}
                        />
                </div>
            <button 
                type="button" 
                className=" btn btn-dark w-fit"
                onClick={()=> navigate("/companies")}
            >
                Vai alle Aziende
            </button>
            </div>  
        </>
    );
}

export default CompaniesDashboard;


