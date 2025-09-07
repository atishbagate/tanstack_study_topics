import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./postApi";

const PostTitle = ({ title }: { title: string }) => {


  const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts-titles"],
        queryFn: fetchPosts,
        select: (data) => data.map((post: any) => post.title),
    })
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="border rounded p-4 mt-4">
        <h3 className="text-lg font-semibold mb-2">📝 Post Titles (via select)</h3>
        <h1>{title}</h1>
        <ul className="list-disc pl-5 space-y-1">
          {data?.slice(0, 10).map((title: string, idx: number) => (
            <li key={idx}>{title}</li>
          ))}
        </ul>
      </div>
    )
}

export default PostTitle;