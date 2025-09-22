import React from "react";
import jsPDF from "jspdf";

const ExportPDF_projects = ({ projects }) => {

  const generatePDF = ({ title, columns, rows }) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    const startX = 5;
    doc.text(title, startX, 15);

    doc.setFontSize(10);
    const cellHeight = 9;
    const rowsPerPage = 30; // max 30 lines per page

    // --- Calculate the dynamic column width ---
    const colWidths = columns.map((col, i) => {
      let maxWidth = doc.getTextWidth(col) + 7;
      rows.forEach(row => {
        const cellText = row[i] ? String(row[i]) : "-";
        const textWidth = doc.getTextWidth(cellText) + 7;
        if (textWidth > maxWidth) maxWidth = textWidth;
      });
      return maxWidth;
    });

    let page = 1;
    let startY = 25;

    const addHeader = () => {
      let x = startX;
      columns.forEach((col, i) => {
        doc.text(col, x + 2, startY + 5);
        doc.rect(x, startY, colWidths[i], cellHeight);
        x += colWidths[i];
      });
      startY += cellHeight;
    };

    const addFooter = () => {
      doc.setFontSize(10);
      doc.text(`Pagina ${page}`, 105, 290, { align: "center" });
    };

    // --- First page ever on printed PDF ---
    addHeader();

    rows.forEach((row, index) => {
      if (index > 0 && index % rowsPerPage === 0) {
        addFooter();
        doc.addPage();
        page++;
        startY = 25;
        addHeader();
      }

      let x = startX;
      row.forEach((cell, i) => {
        doc.text(cell ? String(cell) : "-", x + 2, startY + 5);
        doc.rect(x, startY, colWidths[i], cellHeight);
        x += colWidths[i];
      });
      startY += cellHeight;
    });

    addFooter();
    doc.save(`${title.replace(" ", "_").toLowerCase()}.pdf`);
  };

  const handleDownloadPDF = () => {
    if (!projects || projects.length === 0) return;

    const title = "Progetti";
    const columns = ["N.","Nome", "Azienda", "Stato", "Budget", "Inizio", "Fine"];

    // Sort projects by name, A-Z
    const sortedProjects = [...projects].sort((a, b) => {
      const nameA = a.name ? a.name.toLowerCase() : "";
      const nameB = b.name ? b.name.toLowerCase() : "";
      return nameA.localeCompare(nameB);
    });

    const rows = sortedProjects.map((p, index) => [
        index + 1,
        p.name || "-",
        p.company_name || "-",
        p.status || "-",
        p.budget || "-",
        p.start_date ? new Date(p.start_date).toLocaleDateString("it-IT") : "-",
        p.end_date ? new Date(p.end_date).toLocaleDateString("it-IT") : "-"
    ]);

    generatePDF({ title, columns, rows });
  };

  return (
    <button
      onClick={handleDownloadPDF}
      type="button"
      className="btn btn-success"
    >
      Esporta
    </button>
  );
};

export default ExportPDF_projects;
