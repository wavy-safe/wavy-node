interface FeatureBoxProps {
  title: string;
  description: string;
}

export default function FeatureBox({ title, description }: FeatureBoxProps) {
  return (
    <div className="p-4 text-center">
      <h2 className="font-semibold text-xl bg-blue-300 p-2 rounded">
        {title}
      </h2>
      <p>{description}</p>
    </div>
  );
}
