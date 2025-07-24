import React from "react";

type StatusBadgeProps = {
  status: string;
  type?: "dispute" | "feedback" | "receipt";
};

const statusMap: Record<string, { label: string; color: string }> = {
  open: { label: "Open", color: "bg-yellow-500 text-black" },
  resolved: { label: "Resolved", color: "bg-green-500 text-white" },
  in_progress: { label: "In Progress", color: "bg-blue-500 text-white" },
  closed: { label: "Closed", color: "bg-gray-500 text-white" },
  paid: { label: "Paid", color: "bg-cyan-500 text-black" },
  refunded: { label: "Refunded", color: "bg-purple-500 text-white" },
};

export default function StatusBadge({ status, type }: StatusBadgeProps) {
  const s = statusMap[status.toLowerCase()] || {
    label: status,
    color: "bg-gray-700 text-white",
  };
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${s.color} shadow`}
      title={type ? `${type} status: ${s.label}` : s.label}
    >
      {s.label}
    </span>
  );
} 