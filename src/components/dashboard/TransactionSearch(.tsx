import { Input } from 'shadcn/input';
import { Button } from 'shadcn/button';



export default function TransactionSearch() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <img src="/path/to/logo.png" alt="Logo" className="h-12 mb-4" />
        <h1 className="text-4xl font-semibold text-gray-800">Wavy Node</h1>
      </div>
      
      {/* Search Bar */}
      <div className="w-full max-w-md">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Find the status of an address"
            className="flex-1 rounded-l-full border border-gray-300 px-4 py-2 focus:outline-none"
          />
          <Button className="rounded-r-full bg-gray-800 text-white px-6 py-2 hover:bg-gray-700">
            Search
          </Button>
        </div>
        <p className="text-gray-500 mt-2 text-center">
          Find the status of an address
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
