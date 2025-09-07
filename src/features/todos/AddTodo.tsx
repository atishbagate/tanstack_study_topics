import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface CreateTodoRequest {
  title: string;
  completed: boolean;
  userId: number;
}

const createTodo = async (todo: CreateTodoRequest): Promise<Todo> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  
  return response.json();
};

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(1);
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      // Invalidate and refetch todos query
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      
      // Reset form
      setTitle('');
      setUserId(1);
      
      // Show success message (you could use a toast library here)
      console.log('Todo created successfully:', newTodo);
    },
    onError: (error) => {
      console.error('Failed to create todo:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTodoMutation.mutate({
      title: title.trim(),
      completed: false,
      userId,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Todo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Todo Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
            User ID
          </label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={createTodoMutation.isPending || !title.trim()}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createTodoMutation.isPending ? 'Creating...' : 'Add Todo'}
        </button>
      </form>

      {createTodoMutation.isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          Error: {createTodoMutation.error?.message}
        </div>
      )}

      {createTodoMutation.isSuccess && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          Todo created successfully!
        </div>
      )}
    </div>
  );
};

export default AddTodo;
