import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
  id: number;
  title: string;
};

// Dynamic Query Key: The query key is ['posts', page]. When you click "Next Page", the page state changes, which in turn changes the query key. TanStack Query sees this new key and automatically triggers a fetch for that page's data.
// placeholderData: keepPreviousData: This is the magic for a good UX. When you click "Next Page", notice how the old data stays on the screen while the new data is being fetched in the background. The isPlaceholderData flag becomes true during this time, which we use to disable the "Next Page" button to prevent multiple rapid clicks.
// isFetching vs. isLoading:
// isLoading (which we aren't using here) is only true for the very first fetch when there's no cached data at all.
// isFetching is true any time a request is in-flight. You can see the "Loading..." text appear for background fetches on subsequent pages.
// Disabling Buttons: The "Next Page" button is disabled when !data?.hasMore is true, indicating we've reached the end of the data, or when we're already fetching the next page (isPlaceholderData). The "Previous Page" button is disabled when we're on the first page.

// Click "Next Page". You'll see the old data (with its original timestamp) while the new page loads. Then, the new posts will appear with a brand new timestamp.
// Navigate to page 3.
// Click "Previous Page" to go back to page 2. Since staleTime is 5 seconds, the data for page 2 is still fresh, so you should see the exact same data with the same timestamp you saw before. No network request will be made.
// Wait more than 5 seconds.
// Now click back to page 3. You will briefly see the old, stale data for page 3, and then it will quickly be replaced by newly fetched data with an updated timestamp.
// This should make the concepts of staleTime and keepPreviousData much clearer!

// This is a mock API function. In a real app, this would be
// your fetch/axios call to your backend.
const fetchPosts = async (
  page: number
): Promise<{ posts: Post[]; hasMore: boolean }> => {
  console.log(`Fetching page: ${page}`);
  const limit = 5;
  const posts: Post[] = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1} (fetched at ${new Date().toLocaleTimeString()})`,
  }));

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = posts.slice(start, end);

  await new Promise((r) => setTimeout(r, 500)); // Simulate network delay

  return { posts: paginatedPosts, hasMore: end < posts.length };
};

export const PaginatedPosts = () => {
  const [page, setPage] = useState(1);

  const { data, isError, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData,
    staleTime: 5000, // Keep data fresh for 5 seconds
  });

  return (
    <div>
      <h1>Paginated Posts</h1>
      {isError && <div>Error: {error.message}</div>}

      <div>
        {data?.posts.map((post) => (
          <p key={post.id}>{post.title}</p>
        ))}
      </div>

      <h4>Current Page: {page}</h4>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          onClick={() => {
            if (!isPlaceholderData && data?.hasMore) {
              setPage((p) => p + 1);
            }
          }}
          disabled={isPlaceholderData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}
      </div>
    </div>
  );
};
