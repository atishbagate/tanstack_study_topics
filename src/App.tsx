import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import FeatureWrapper from './components/FeatureWrapper';

// Import feature components
import PostsManager from "./features/posts/PostsManager";
import InfinitePosts from "./features/posts/InfinitePosts";
import InfiniteScrollingPosts from "./features/posts/InfiniteScrollingPost";
import PaginatedUsers from "./features/users/PaginatedUsers";
import UserSearch from "./features/users/UserSearch";
import UserWithPosts from "./features/users/UserWithPosts";
import TodoList from "./features/todos/TodoList";
import AddTodo from "./features/todos/AddTodo";
import UserDashboard from "./features/dashboard/UserDashboard";
import ParallelQueries from "./features/dashboard/ParallelQueries";
import SuspensePosts from "./features/advanced/SuspensePosts";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App = () => {
  const [currentFeature, setCurrentFeature] = useState('home');

  const renderFeature = () => {
    switch (currentFeature) {
      case 'home':
        return <HomePage onFeatureChange={setCurrentFeature} />;
      
      case 'posts':
        return (
          <FeatureWrapper
            title="Posts Management"
            description="Learn about basic queries and mutations with posts data. This section demonstrates CRUD operations, optimistic updates, and error handling."
            tips={[
              "Try adding a new post to see optimistic updates in action",
              "Delete posts to see how mutations work with cache invalidation",
              "Notice how the UI updates automatically when data changes"
            ]}
          >
            <PostsManager />
          </FeatureWrapper>
        );
      
      case 'users':
        return (
          <FeatureWrapper
            title="User Management"
            description="Explore user queries with pagination, search functionality, and dependent queries."
            tips={[
              "Use the search functionality to filter users",
              "Navigate through pages to see pagination in action",
              "Click on a user to see their posts (dependent queries)"
            ]}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <UserSearch />
              <PaginatedUsers />
              <UserWithPosts userId={1} />
            </Box>
          </FeatureWrapper>
        );
      
      case 'todos':
        return (
          <FeatureWrapper
            title="Todo Management"
            description="Complete CRUD operations with todos, including add, delete, and real-time updates."
            tips={[
              "Add new todos to see mutations in action",
              "Delete todos to see optimistic updates",
              "Notice how the UI stays in sync with server state"
            ]}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <AddTodo />
              <TodoList />
            </Box>
          </FeatureWrapper>
        );
      
      case 'dashboard':
        return (
          <FeatureWrapper
            title="Dashboard"
            description="Advanced query patterns including parallel queries, prefetching, and background updates."
            tips={[
              "Watch how multiple queries load in parallel",
              "Notice the loading states and error handling",
              "See how data is prefetched for better UX"
            ]}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <UserDashboard />
              <ParallelQueries />
            </Box>
          </FeatureWrapper>
        );
      
      case 'advanced':
        return (
          <FeatureWrapper
            title="Advanced Features"
            description="Suspense integration, infinite queries, and other advanced TanStack Query patterns."
            tips={[
              "Scroll down to see infinite loading in action",
              "Notice how Suspense provides better loading states",
              "See how data is cached and reused efficiently"
            ]}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <SuspensePosts />
              <InfinitePosts />
              <InfiniteScrollingPosts />
            </Box>
          </FeatureWrapper>
        );
      
      default:
        return <HomePage onFeatureChange={setCurrentFeature} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout currentFeature={currentFeature} onFeatureChange={setCurrentFeature}>
        {renderFeature()}
      </Layout>
    </ThemeProvider>
  );
};

export default App;