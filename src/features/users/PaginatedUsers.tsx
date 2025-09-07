import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

const fetchUsers = async (page: number, limit: number = 10): Promise<UsersResponse> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
  );
  const users = await response.json();
  
  // Get total count from headers
  const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  
  return {
    users,
    total,
    page,
    limit
  };
};

const PaginatedUsers: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery<UsersResponse>({
    queryKey: ['users', page, limit],
    queryFn: () => fetchUsers(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (isLoading) {
    return <div className="flex justify-center items-center p-8">
      <div className="text-lg">Loading users...</div>
    </div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center p-8">
      <div className="text-red-600">Error: {error?.message}</div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Paginated Users</h1>
      
      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Users (Page {page})</h2>
          {isFetching && (
            <span className="ml-2 text-sm text-gray-500">Refreshing...</span>
          )}
        </div>
        
        <div className="divide-y divide-gray-200">
          {data?.users.map((user:any) => (
            <div key={user.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">@{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-sm text-gray-400">ID: {user.id}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, data?.total || 0)} of{' '}
          {data?.total || 0} users
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="px-3 py-2 text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>
          
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          
          <button
            onClick={() => setPage(totalPages)}
            disabled={page >= totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      </div>

      {/* Page Numbers */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                pageNum === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginatedUsers;
