import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const ExportPDF_project = ({ project }) => {
  if (!project) return null;

  const handleExport = () => {
    const doc = new jsPDF();

     // Function to format the data from Iso to the timezone stored in the client's browser
    function formatDate(isoString) {
    if (!isoString) return '';
    // Trasforma in locale 'it-IT' → dd/mm/yyyy
    return new Date(isoString).toLocaleDateString('it-IT');
    }


    // Title
    doc.setFontSize(18);
    doc.text(`${project.name}`, 14, 20);

    // Table with " field : value"
    const tableData = [
      ["Nome", project.name? project.name : "-"],
      ["Azienda", project.company_name? project.company_name : "-"],
      ["Status", project.status? project.status : "-"],
      ["Inizio",  project.start_date? formatDate(project.start_date) : "-"],
      ["Fine",  project.end_date? formatDate(project.end_date) : "-"],
      ["Budget", project.budget ? `${project.budget} €` : "-"],
      ["Dettagli", project.description? project.description : "-"],
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

    doc.save(`${project.name || "export"}.pdf`);
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

export default ExportPDF_project;
