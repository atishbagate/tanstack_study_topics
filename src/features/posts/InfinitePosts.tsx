import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostsResponse {
  posts: Post[];
  nextPage: number | undefined;
  hasNextPage: boolean;
}

const fetchPosts = async ({ pageParam = 1 }): Promise<PostsResponse> => {
  const limit = 10;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${limit}`
  );
  const posts = await response.json();
  
  // Check if there are more pages
  const total = parseInt(response.headers.get('X-Total-Count') || '0', 10);
  const hasNextPage = pageParam * limit < total;
  const nextPage = hasNextPage ? pageParam + 1 : undefined;
  
  return {
    posts,
    nextPage,
    hasNextPage
  };
};

const InfinitePosts: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: ['infinite-posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialPageParam: 1,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading posts...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-600">Error: {error?.message}</div>
      </div>
    );
  }

  const allPosts = data?.pages.flatMap(page => page.posts) || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Infinite Posts</h1>
      
      {/* Posts List */}
      <div className="space-y-4 mb-6">
        {allPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.body}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Post ID: {post.id}</span>
              <span>User ID: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More Posts'}
          </button>
        )}
        
        {!hasNextPage && allPosts.length > 0 && (
          <div className="text-center text-gray-500 py-4">
            <p className="text-lg">🎉 You've reached the end!</p>
            <p className="text-sm">All posts have been loaded.</p>
          </div>
        )}
      </div>

      {/* Loading Indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading more posts...</span>
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Total posts loaded: {allPosts.length}</p>
        {data?.pages.length && (
          <p>Pages fetched: {data.pages.length}</p>
        )}
      </div>
    </div>
  );
};

export default InfinitePosts;
