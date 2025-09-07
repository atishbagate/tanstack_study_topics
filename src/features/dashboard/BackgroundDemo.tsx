import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from './dashboardApi';

const BackgroundDemo: React.FC = () => {

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
     queryKey: ["backgroundComments"], queryFn: fetchComments,
     staleTime: 1000 * 5,
     refetchOnWindowFocus: true,
     refetchInterval: 10000,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="border rounded p-4 mt-6">
      <h2 className="text-lg font-semibold mb-2">
        🔄 Background Comments (auto-refresh)
      </h2>
      <button
        onClick={() => refetch()}
        className="px-3 py-1 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isFetching ? "Refreshing..." : "Manual Refresh"}
      </button>

      <ul className="list-disc pl-5 max-h-40 overflow-y-scroll border rounded p-2">
        {data.slice(0, 10).map((c: any) => (
          <li key={c.id}>
            <strong>{c.email}:</strong> {c.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BackgroundDemo;
