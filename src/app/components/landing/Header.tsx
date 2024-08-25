import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow">
      <Image src="/wavyNode.svg" alt="WavyNode Logo" width={100} height={50} />
      <h1 className="text-3xl font-medium text-gray-800">WavyNode</h1>
      <button className="bg-gray-800 text-white text-sm py-1 px-3 rounded-full">
        Platform
      </button>
    </header>
  );
}
