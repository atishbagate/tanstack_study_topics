import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

const TodoList: React.FC = () => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    staleTime: 1 * 60 * 1000, // 1 minutes
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading todos...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-600">Error: {error?.message}</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Todo List</h2>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="space-y-3">
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className={`p-4 border rounded-lg ${
              todo.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {todo.title}
              </span>
              <span className="text-sm text-gray-500">User {todo.userId}</span>
            </div>
          </div>
        ))}
      </div>

      {todos && todos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No todos found
        </div>
      )}
    </div>
  );
};

export default TodoList;
