import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};
const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};
const fetchPostById = async ({ queryKey }: { queryKey: number }) => {
  const [, postId] = queryKey;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return res.json();
};

export const RefetchAfterInterval = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["post"],
    queryFn: fetchPosts,
    refetchInterval: 5000, //refetch after every 5 sec
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const CustomRefetch = () => {
  const { data, refetch } = useQuery({
    queryKey: ["CustomRefetch"],
    queryFn: fetchPosts,
  });

  return (
    <div>
      <h1>Posts</h1> <br />
      <button onClick={() => refetch()}>Refetch</button> <br />
      <ul>
        {data?.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

const addUser = async (user: any) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const MutationPost = () => {
  const mutation = useMutation({
    mutationFn: addUser,
  });

  return (
    <div>
      <button
        onClick={() =>
          mutation.mutate({ name: "New User", email: "newuser@example.com" })
        }
      >
        Add User
      </button>
      {mutation.isPending && <p>Adding user...</p>}
      {mutation.isSuccess && <p>User added successfully!</p>}
    </div>
  );
};

export const InvalidationOfQuery = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"], //refetch the user list
      });
    },
  });

  return (
    <div>
      <button
        onClick={() =>
          mutation.mutate({ name: "New User", email: "newuser@example.com" })
        }
      >
        Add User
      </button>
      <div>
        <h1>Posts</h1>
        <ul>
          {data.map((post: any) => (
            <li key={post.id}>{post.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const QueryWithDynamicParams = ({ postId }: { postId: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getPostById", postId],
    queryFn: fetchPostById,
    enabled: !!postId, // Prevents fetching when postId is null
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h2>
        {data.id} - {data.title}
      </h2>
      <p>{data.body}</p>
    </>
  );
};
