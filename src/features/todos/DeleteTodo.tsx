import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const deleteTodo = async (todoId: number): Promise<void> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
};

interface DeleteTodoProps {
  todo: Todo;
}

const DeleteTodo: React.FC<DeleteTodoProps> = ({ todo }) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (todoId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        if (!old) return old;
        return old.filter(t => t.id !== todoId);
      });

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (_err, _todoId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure cache consistency
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      deleteTodoMutation.mutate(todo.id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleteTodoMutation.isPending}
      className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {deleteTodoMutation.isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteTodo;
