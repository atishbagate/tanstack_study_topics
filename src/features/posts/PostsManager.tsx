// src/features/posts/PostsManager.tsx
import SuspensePosts from "../advanced/SuspensePosts";
import AddPostForm from "./components/AddPostForm";
import PostList from "./components/PostList";
import { Suspense } from "react";

export default function PostsManager() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Posts Manager</h2>
      <AddPostForm />
      {/* Suspense Posts */}
      <Suspense fallback={<div>Loading...</div>}> 
        <SuspensePosts />
      </Suspense>
      <PostList />
    </div>
  );
}
