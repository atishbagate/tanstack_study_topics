import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
};

// Simulated server-side posts DB
let serverPosts: Post[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
}));

// Mock API: fetch all posts
const fetchPosts = async (): Promise<Post[]> => {
  await new Promise((r) => setTimeout(r, 400));
  return [...serverPosts];
};

// Mock API: add a post
const addPost = async (title: string): Promise<Post> => {
  await new Promise((r) => setTimeout(r, 600));
  // Simulate random error
  if (Math.random() < 0.2) throw new Error("Random server error!");
  const newPost = { id: Date.now(), title };
  serverPosts = [...serverPosts, newPost];
  return newPost;
};

export const OptimisticPosts = () => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["optimistic-posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: addPost,
    // Optimistically update the cache before the mutation runs
    onMutate: async (newTitle: string) => {
      setErrorMsg("");
      await queryClient.cancelQueries({ queryKey: ["optimistic-posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>([
        "optimistic-posts",
      ]);
      const optimisticPost = {
        id: Date.now(),
        title: newTitle + " (optimistic)",
      };
      queryClient.setQueryData<Post[]>(["optimistic-posts"], (old) =>
        old ? [...old, optimisticPost] : [optimisticPost]
      );
      return { previousPosts };
    },
    // If the mutation fails, roll back
    onError: (err, _newTitle, context) => {
      setErrorMsg((err as Error).message);
      if (context?.previousPosts) {
        queryClient.setQueryData(["optimistic-posts"], context.previousPosts);
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["optimistic-posts"] });
    },
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    mutation.mutate(input.trim());
    setInput("");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 16,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Optimistic Posts</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a post title"
          style={{ width: "70%", marginRight: 8 }}
        />
        <button type="submit" disabled={mutation.isPending || !input.trim()}>
          {mutation.isPending ? "Adding..." : "Add Post"}
        </button>
      </form>
      {errorMsg && (
        <div style={{ color: "red", marginBottom: 8 }}>{errorMsg}</div>
      )}
      {isLoading ? (
        <div>Loading posts...</div>
      ) : isError ? (
        <div>Error: {(error as Error).message}</div>
      ) : (
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
