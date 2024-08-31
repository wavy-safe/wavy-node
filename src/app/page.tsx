import Header from "./landing/Header";
import MainContent from "./landing/MainContent";
import Footer from './landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-center mx-auto">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
