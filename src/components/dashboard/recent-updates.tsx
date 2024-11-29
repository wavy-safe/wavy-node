import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentUpdates() {
  const updates = [
    {
      id: 1,
      title: "New Alert Detected",
      description: "Suspicious activity detected in network ABC",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      title: "System Update",
      description: "Successfully deployed version 2.1.0",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      title: "Network Added",
      description: "New network XYZ has been integrated",
      timestamp: "2 hours ago",
    },
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {updates.map((update) => (
            <div key={update.id} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {update.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {update.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {update.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
