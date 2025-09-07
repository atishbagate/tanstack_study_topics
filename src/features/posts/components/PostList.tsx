import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../postApi";
import DeletePostButton from "./DeletePostButton";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export default function PostList() {
    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["posts-list"],
        queryFn: () => fetchPosts(),
        staleTime: 30,
        refetchOnWindowFocus: true,
    });

    // Debug: Log the data structure
    console.log("Posts data:", posts, "Is Array:", Array.isArray(posts));

    return (
        <div>
            <h1>Post List</h1>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {error?.message}</div>}
            {posts && Array.isArray(posts) ? (
                posts.map((post: Post) => (
                    <div key={post.id} className="border-b py-2 px-2 bg-white shadow rounded-lg my-2">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{post.title}</span>
                            <DeletePostButton post={post.id} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{post.body.substring(0, 100)}...</p>
                    </div>
                ))
            ) : (
                <div>No posts available or data is not in expected format</div>
            )}
        </div>
    )
}