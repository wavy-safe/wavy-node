"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Webhook, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const handleDocumentationClick = () => {
    window.open("https://wavynode.com", "_blank");
  };

  return (
    <div className="space-y-6 p-4"> {/* Añadido padding para margen interior */}
      <div className="flex items-center justify-between gap-4"> {/* Ajuste de alineación */}
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1> {/* Título más grande */}
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2"
          onClick={handleDocumentationClick}
        >
          <BookOpen className="h-5 w-5" /> {/* Ícono ligeramente más grande */}
          Ver Documentación
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2"> {/* Más espacio entre las tarjetas */}
        <Card className="border border-border bg-card/50 shadow-sm backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-5 w-5 text-primary" /> {/* Ícono más grande */}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Active API keys</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/50 shadow-sm backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webhooks</CardTitle>
            <Webhook className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
            <p className="text-sm text-muted-foreground">Active webhooks</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
