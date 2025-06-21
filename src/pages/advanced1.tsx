import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};
export const QueryCachingAndStaleTime = () => {
  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 30000, // Data stays fresh for 30 seconds
    // cacheTime: 300000, // Cached data stays for 5 minutes
  });

  return (
    <>
      <h2> Stale Time vs. Cache Time </h2>
      <p>
        staleTime: How long data is considered fresh (prevents unnecessary
        refetching). <br /> cacheTime: How long unused data stays in memory
        before being removed.{" "}
      </p>
      <button onClick={() => refetch()}>Fetch</button>
    </>
  );
};
