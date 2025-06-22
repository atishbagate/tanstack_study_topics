import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type Post = {
  id: number;
  title: string;
};

// How useInfiniteQuery is different:
// New Hook: We're using useInfiniteQuery, not useQuery.
// Data Structure: The data object is different. It now contains a pages array, where each element is the result from one API call. It also has a pageParams array. We have to map over data.pages to render our list.
// initialPageParam: This tells the hook what the value for the very first page's cursor (or page number) should be. We've set it to 1.
// getNextPageParam: This is the most crucial new option. It's a function that TanStack Query calls after each successful fetch. Its job is to look at the data from the last page and figure out what the next page's cursor should be. Our mock API returns a nextCursor property. If it's undefined, TanStack Query knows we've reached the end.
// fetchNextPage: This is the function we call to trigger a fetch for the next page. We've wired it to our "Load More" button.
// hasNextPage: This is a boolean that is true as long as getNextPageParam returns a value (and not undefined). We use it to disable the "Load More" button when we're at the end of the data.
// Go ahead and click the "Load More" button to see it in action! You'll see the list of posts grow as you fetch more pages.

// Mock API that mimics cursor-based pagination
const fetchPosts = async ({
  pageParam,
}: {
  pageParam: number;
}): Promise<{ posts: Post[]; nextCursor: number | undefined }> => {
  console.log(`Fetching page with cursor: ${pageParam}`);
  const limit = 5;

  // In a real app, you'd have a big list of data.
  // We'll simulate it.
  const allPosts: Post[] = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1} (fetched at ${new Date().toLocaleTimeString()})`,
  }));

  const cursor = pageParam;
  const start = (cursor - 1) * limit;
  const end = start + limit;

  const paginatedPosts = allPosts.slice(start, end);

  // Determine if there's a next page
  const nextCursor = end < allPosts.length ? cursor + 1 : undefined;

  await new Promise((r) => setTimeout(r, 500)); // Simulate network delay

  return { posts: paginatedPosts, nextCursor };
};

export const InfinitePosts = () => {
  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinitePosts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <div>
      <h1>Infinite Scroll Posts</h1>
      {isError && <div>Error: {error.message}</div>}

      <div>
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.posts.map((post) => (
              <p key={post.id}>{post.title}</p>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};
