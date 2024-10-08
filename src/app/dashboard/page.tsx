import DashboardNav from "./(commponents)/dashboardnavar";
import Footer from "../../components/landing/Footer";
import PortfolioSummary from "./(commponents)/PortfolioSummary";

export default function Dashboard() {
  return (
    <div>
      <DashboardNav />
      <PortfolioSummary />
      <Footer />
    </div>
  );
}
