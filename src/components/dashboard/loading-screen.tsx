"use client";

export default function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
