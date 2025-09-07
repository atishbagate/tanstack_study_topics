import { useQueryClient } from "@tanstack/react-query";

export default function DeletePostButton({ post }: { post: any }) {
    const queryClient = useQueryClient();
    const deletePost = async (postId: number) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "DELETE",
        }).then(() => {
        window.alert("Post deleted");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <button onClick={() => deletePost(post)}>Delete Post</button>
    )

}
