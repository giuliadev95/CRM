import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TotalCompaniesCard() {
  const [totalCompanies, setsetTotalCompanies] = useState([]);

    useEffect(() => {
        fetch(`http://192.168.1.3:3000/api/companies/get/`)
        .then((res) => {
            if (!res.ok) throw new Error("Error fetching recent contacts");
            return res.json();
        })
        .then((data) => setsetTotalCompanies(data))
        .catch((err) => console.error(err));
    }, []);

    return (
    <div className="card mt-3 w-[200px] lg:w-fit h-auto ">    
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Aziende</h5>   
                <p class="card-text">{totalCompanies.length}</p>
                <Link to="/companies" class="btn btn-primary">Vedi tutte</Link>            
            </div>
        </div>
    </div>
    );
}

export default TotalCompaniesCard;


