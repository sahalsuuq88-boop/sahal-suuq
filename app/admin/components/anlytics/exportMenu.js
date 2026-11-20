"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ExportButton() {
  const handleExport = () => {
    alert("Exporting analytics data... (mock)");
  };

  return (
    <Button onClick={handleExport}>
      <Download className="w-4 h-4 mr-2" />
      Export
    </Button>
  );
}