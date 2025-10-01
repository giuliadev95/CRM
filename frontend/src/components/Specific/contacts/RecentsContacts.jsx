import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function RecentContacts() {
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/contacts/get/recent`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching recent contacts");
        return res.json();
      })
      .then((data) => setRecentContacts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card mt-3 w-fit h-auto">    
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">Contatti recenti</h5>   
                <p class="card-text">{recentContacts.length}</p>
                <Link to="/" class="btn btn-primary">Vedi tutti</Link>            
          </div>
      </div>
    </div>
  );
}

export default RecentContacts;


