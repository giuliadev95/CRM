import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const ExportPDF_contact = ({ contact }) => {
  if (!contact) return null;

  const handleExport = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(`${contact.name} ${contact.surname}`, 14, 20);

    // Table with " field : value"
    const tableData = [
      ["Nome", contact.name || "-"],
      ["Cognome", contact.surname || "-"],
      ["Telefono", contact.phone || "-"],
      ["Email", contact.email || "-"],
      ["Ruolo", contact.role || "-"],
      ["Azienda", contact.company_name || "-"],
      ["Dettagli", contact.details || "-"],
    ];

    // Use autotable to generate pdf table with columns titles: "Campo", "Valore"
    autoTable(doc, {
      startY: 30,
      head: [["Campo", "Valore"]],
      body: tableData,
    });

    doc.save(`${contact.name || "export"}_${contact.surname || ""}.pdf`);
  };

  return (
    <button
      type="button"
      className="btn btn-success"
      onClick={handleExport}
    >
      Esporta
    </button>
  );
};

export default ExportPDF_contact;
