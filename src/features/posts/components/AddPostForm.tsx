import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


const createPost = async (post: { title: string, body: string }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(post),
    });
    return response.json();
}

export default function AddPostForm() {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            setTitle("");
            setBody("");
        },
        onError: (error) => {
            console.log(error);
        }
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) {
            return;
        }
        createPostMutation.mutate({ title, body });

    }

    return (
        <>
            <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center gap-4">
                <h2>Add Post</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <button type="submit">{createPostMutation.isPending ? "Creating..." : "Add Post"}</button>
                </form>
                {createPostMutation.isError && <div>Error: {createPostMutation.error.message}</div>}
                {createPostMutation.isSuccess && <div>Post added successfully</div>}
            </div>
        </>
    )
}