import ReportAI from "../components/dashboard/report-ai";

export default async function AgentsPage({
  params,
}: {
  params: { address: string };
}) {
  const { address } = params;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <ReportAI address={address} />
    </div>
  );
}
