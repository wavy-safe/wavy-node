import Header from "./components/landing/Header";
import MainContent from "./components/landing/MainContent";
import Footer from "./components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-center mx-auto">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
