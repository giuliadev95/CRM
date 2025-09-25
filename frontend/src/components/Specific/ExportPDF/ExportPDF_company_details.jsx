import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const ExportPDF_company = ({ company }) => {
  if (!company) return null;

  const handleExport = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Dettagli Azienda", 14, 20);

    // Table with " field : value"
    const tableData = [
      ["Nome", company.name || "-"],
      ["Telefono", company.phone || "-"],
      ["Email", company.email || "-"],
      ["Sito web", company.website || "-"],
      ["Tipologia", company.company_type || "-"],
      ["Dettagli", company.notes || "-"],
    ];

    // Use autotable to generate pdf table with columns titles: "Campo", "Valore"
    autoTable(doc, {
      startY: 30,
      head: [["Campo", "Valore"]],
      body: tableData,
      didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 0) {
        // "Campo"
        data.cell.styles.fontStyle = "bold";
      }
    }
    });

    doc.save(`Azienda_${company.name || "export"}.pdf`);
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

export default ExportPDF_company;
