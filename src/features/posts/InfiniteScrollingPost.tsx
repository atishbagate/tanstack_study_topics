// src/features/posts/InfiniteScrollingPost.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${pageParam}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
};

export default function InfiniteScrollingPosts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["infinite-scrolling-posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined; // stop when no more posts
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });

  const loadMoreRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading posts</p>;

  // Flatten all posts from all pages
  const allPosts = data?.pages.flatMap(page => page) || [];

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Infinite Scrolling Posts (Animated)</h2>

      <div className="space-y-2">
        {allPosts.map((post: Post) => (
          <motion.div
            key={post.id}
            className="border-b py-2 px-2 bg-white shadow rounded-lg my-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-medium">Post #{post.id} : {post.title}</p>
            <p className="text-sm text-gray-600 mt-1">{post.body.substring(0, 100)}...</p>
          </motion.div>
        ))}
      </div>

      {/* Sentinel */}
      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && <p className="text-gray-500">Loading more...</p>}
      {!hasNextPage && <p className="text-gray-400">No more posts</p>}
    </div>
  );
}
