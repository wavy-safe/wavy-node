interface FeatureBoxProps {
  title: string;
  description: string;
}

export default function FeatureBox({ title, description }: FeatureBoxProps) {
  return (
    <div className="p-4 text-center">
      <h2 className="bg-gray-800 text-white text-center text-lg py-2 px-5 rounded-full inline-block">
        {title}
      </h2>
      <p className="mt-2 text-gray-700">{description}</p>
    </div>
  );
}
