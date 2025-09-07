import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import {
  Article as ArticleIcon,
  People as PeopleIcon,
  PlaylistAdd as TodoIcon,
  Dashboard as DashboardIcon,
  Science as AdvancedIcon,
  QueryStats as QueryIcon,
  AutoAwesome as MutationIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';

interface HomePageProps {
  onFeatureChange: (feature: string) => void;
}

const features = [
  {
    id: 'posts',
    title: 'Posts Management',
    description: 'Learn about basic queries and mutations with posts data. Includes CRUD operations, optimistic updates, and error handling.',
    icon: <ArticleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    tags: ['Query', 'Mutation', 'CRUD', 'Optimistic Updates'],
    color: '#1976d2',
  },
  {
    id: 'users',
    title: 'User Management',
    description: 'Explore user queries with pagination, search functionality, and dependent queries.',
    icon: <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
    tags: ['Pagination', 'Search', 'Dependent Queries'],
    color: '#9c27b0',
  },
  {
    id: 'todos',
    title: 'Todo Management',
    description: 'Complete CRUD operations with todos, including add, delete, and real-time updates.',
    icon: <TodoIcon sx={{ fontSize: 40, color: 'success.main' }} />,
    tags: ['CRUD', 'Real-time', 'Mutations'],
    color: '#2e7d32',
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Advanced query patterns including parallel queries, prefetching, and background updates.',
    icon: <DashboardIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
    tags: ['Parallel Queries', 'Prefetching', 'Background Updates'],
    color: '#ed6c02',
  },
  {
    id: 'advanced',
    title: 'Advanced Features',
    description: 'Suspense integration, infinite queries, and other advanced TanStack Query patterns.',
    icon: <AdvancedIcon sx={{ fontSize: 40, color: 'error.main' }} />,
    tags: ['Suspense', 'Infinite Queries', 'Advanced Patterns'],
    color: '#d32f2f',
  },
];

const HomePage: React.FC<HomePageProps> = ({ onFeatureChange }) => {
  return (
    <Box>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          TanStack Query Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore the power of TanStack Query with interactive examples
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid item xs={12} md={6} lg={4} key={feature.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  {feature.icon}
                  <Typography variant="h5" component="h2" sx={{ ml: 2, fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                  {feature.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: feature.color,
                        color: feature.color,
                        '&:hover': {
                          backgroundColor: `${feature.color}20`,
                        },
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => onFeatureChange(feature.id)}
                  sx={{
                    backgroundColor: feature.color,
                    '&:hover': {
                      backgroundColor: feature.color,
                      filter: 'brightness(0.9)',
                    },
                  }}
                >
                  Explore Feature
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={6} p={3} bgcolor="grey.50" borderRadius={2}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          What You'll Learn
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <QueryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Data Fetching</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Learn how to fetch data efficiently with caching, background updates, and error handling.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <MutationIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6">Mutations</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Master data mutations with optimistic updates, rollback capabilities, and cache invalidation.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={1}>
              <SyncIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">Real-time Updates</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Keep your UI in sync with server state using automatic refetching and background updates.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
