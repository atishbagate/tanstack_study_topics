import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "./dashboardApi";

const UserPosts = ({ userId }: { userId: number }) => {
    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["posts", userId],
        queryFn: () => fetchUserById(userId),
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <div>
            <h3 className="font-bold text-lg">Posts for User {userId}</h3>
            <ul className="list-disc pl-5">
                {posts.map((post: any) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserPosts;