import React from "react";

type ExportButtonProps = {
  type: "csv" | "pdf";
  data?: any[];
  filename: string;
  onClick?: () => void;
};

function downloadCSV(data: any[], filename: string) {
  const csv =
    Object.keys(data[0]).join(",") +
    "\n" +
    data.map((row) => Object.values(row).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function ExportButton({ type, data, filename, onClick }: ExportButtonProps) {
  return (
    <button
      className="px-3 py-2 rounded bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold shadow hover:opacity-90 transition"
      onClick={() => {
        if (type === "csv" && data) downloadCSV(data, filename);
        else if (type === "pdf" && onClick) onClick();
      }}
    >
      {type === "csv" ? "Export CSV" : "Download PDF"}
    </button>
  );
} 