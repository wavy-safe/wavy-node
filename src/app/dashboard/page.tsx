"use client";

import { Button } from "@/components/ui/button";
import { Key, Webhook, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const handleDocumentationClick = () => {
    window.open("https://docs.wavynode.com/", "_blank");
  };

  return (
    <div className="space-y-8 p-6 max-w-5xl mx-auto"> 
      <div className="flex items-center justify-between gap-4"> 
        <h1 className="text-4xl font-extrabold text-primary">Dashboard</h1> 
        <Button
          variant="outline"
          className="flex items-center gap-2 px-6 py-2 shadow-md hover:shadow-lg transition"
          onClick={handleDocumentationClick}
        >
          <BookOpen className="h-5 w-5" /> 
          Ver Documentación
        </Button>
      </div>

    </div>
  );
}
