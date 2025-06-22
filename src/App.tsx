import "./App.css";
import { QueryCachingAndStaleTime } from "./pages/advanced1";
import Basic1 from "./pages/Basic1";
import {
  CustomRefetch,
  InvalidationOfQuery,
  MutationPost,
  QueryWithDynamicParams,
  RefetchAfterInterval,
} from "./pages/Basic2";
import { InfinitePosts } from "./pages/InfiniteQuery";
import { PaginatedPosts } from "./pages/PaginatedQuery";
import { OptimisticPosts } from "./pages/optimistic/OptimisticPosts";
import { TanstackTopicsList } from "./pages/TanstackTopicsList";

const App = () => {
  return (
    <div>
      <TanstackTopicsList />
      {/* <Basic1 /> */}
      {/* <RefetchAfterInterval /> */}
      {/* <CustomRefetch /> */}
      {/* <MutationPost /> */}
      {/* <InvalidationOfQuery /> */}
      {/* <QueryWithDynamicParams postId={2} /> */}

      {/* <QueryCachingAndStaleTime /> */}
      {/* <PaginatedPosts /> */}
      {/* <InfinitePosts /> */}
      <OptimisticPosts />
    </div>
  );
};

export default App;
