"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <pre className="mb-4 text-red-500">{error.message}</pre>
      <button onClick={reset} className="px-4 py-2 bg-indigo-600 text-white rounded">Try again</button>
    </div>
  );
}
