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

const App = () => {
  return (
    <div>
      {/* <Basic1 /> */}
      <RefetchAfterInterval />
      {/* <CustomRefetch /> */}
      {/* <MutationPost /> */}
      {/* <InvalidationOfQuery /> */}
      {/* <QueryWithDynamicParams postId={2} /> */}

      {/* <QueryCachingAndStaleTime /> */}
    </div>
  );
};

export default App;
