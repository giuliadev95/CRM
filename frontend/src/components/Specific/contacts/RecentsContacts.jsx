import { useEffect, useState } from "react";

function RecentContacts() {
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/contacts/get/recent`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero dei contatti recenti");
        return res.json();
      })
      .then((data) => setRecentContacts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Contatti Creati nell'Ultima Settimana</h5>
        <ul className="list-group">
          {recentContacts.map((c) => (
            <li key={c.id_contact} className="list-group-item">
              {c.name} {c.surname} – {c.company_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecentContacts;
