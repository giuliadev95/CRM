import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function RecentContacts() {
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.1.3:3000/api/contacts/get/recent`)
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching recent contacts");
        return res.json();
      })
      .then((data) => setRecentContacts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="bg-[#c9cbcf] w-fit p-4 rounded-xl">
        <h2 className="h3 flex flex-col items-start justify-start gap-4">
          <div className="flex gap-1">
            {<FaUserAlt/>}
            Contatti recenti
          </div>
          <p className="h1">{recentContacts.length}</p>
        </h2>            
      </div>
      <Link to="/contacts" class="btn btn-dark mt-3">Vai ai Contatti</Link>            
    </>
      
  );
}

export default RecentContacts;


