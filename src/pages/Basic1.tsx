import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};
const Basic1 = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"], // Unique key for caching
    queryFn: fetchUsers, // Function to fetch data
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Basic1;
