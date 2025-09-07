import { useSuspenseQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }
    return res.json();
}

const SuspensePosts = () => {

   const { data } = useSuspenseQuery({
    queryKey: ["suspensePosts"],
    queryFn: fetchPosts,
   });

    return (
    <div className="border rounded p-4 mt-4">
      <h3 className="text-lg font-semibold mb-2">📚 Suspense Posts</h3>
      <ul className="list-disc pl-5 space-y-1">
        {data.slice(0, 5).map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
    )
}

export default SuspensePosts;