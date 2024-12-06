import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  "TL;DR",
  "Latest transactions",
  "Latest interacted dApps",
  "Connections with Suspicious Activities",
  "Hacking Linkage Verification",
];

export function ReportOutline() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Report&apos;s Outline:</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section) => (
          <div
            key={section}
            className="pb-4 border-b last:border-0 text-muted-foreground"
          >
            {section}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
