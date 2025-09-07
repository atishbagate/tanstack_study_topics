import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserById, fetchUsers } from "./dashboardApi";

const UserList = ({ onSelectUser }: { onSelectUser: (userId: number) => void }) => {
  const queryClient = useQueryClient();
    const { data, isLoading, isError, error } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
    
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <div className="mb-4">
        <h3 className="font-bold text-lg">Users</h3>
        <ul className="space-y-1">
          {data?.map((user: any) => (
            <li key={user.id}>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => onSelectUser(user.id)}
                onMouseEnter={() => 
                  queryClient.prefetchQuery({ 
                    queryKey: ["user", user.id],
                    queryFn: () => fetchUserById(user.id),
                    staleTime: 1000 * 60,
                  })}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default UserList;