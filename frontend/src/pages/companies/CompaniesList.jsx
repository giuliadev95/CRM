import { useState, useEffect } from "react";
import '@/styles/app.css';

export default function CompaniesList() {
  
  const [companies, setCompanies] = useState([]);
  const [input, setInput] = useState("");         
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch companies: get
  useEffect(() => {
    fetch("http://localhost:3000/api/companies/get")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      })
      .catch((err) => console.error(`There was an error fetching the companies: ${err}`));
  }, []);

// Filter companies' names when you press the Search button
const filteredCompanies = companies.filter((company) => {
    const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
    const normalizedName = company?.name?.toLowerCase().replace(/\s+/g, '');
    return normalizedName.includes(normalizedSearch);
});

function handleSubmit(e) {
  e.preventDefault();
  // Sanitize input with regex: trims whitespaces and Lowercases everything
  const cleanedInput = input.trim().toLowerCase().replace(/\s+/g, '');
  setSearchTerm(cleanedInput);
}

// Delete company
function deleteCompany(id) {
        if (!id) return console.error("The ID is missing to perform the deletion.");

        fetch(`http://localhost:3000/api/company/delete/${id}`, {
            method: "DELETE",
        })
        .then((res) => {
            if (!res.ok) throw new Error("Error during the deletion.");
            console.log(`Contact with ID: ${id} deleted successfully.`);
            // Avoid mapping and filtering the deleted contact, as its ID will be missing.
            setContacts(contacts.filter((contact) => contact.id_contact !== id));
        })
        .catch((err) => console.error(`Error: ${err}`));
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome azienda"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Cerca</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefono</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <tr key={company.id_company}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                Nessun risultato trovato
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
