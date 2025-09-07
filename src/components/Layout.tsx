import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Paper,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  People as PeopleIcon,
  PlaylistAdd as TodoIcon,
  Science as AdvancedIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
  currentFeature: string;
  onFeatureChange: (feature: string) => void;
}

const features = [
  { id: 'home', name: 'Home', icon: <HomeIcon />, description: 'Overview of TanStack Query Features' },
  { id: 'posts', name: 'Posts Management', icon: <ArticleIcon />, description: 'Query + Mutation examples' },
  { id: 'users', name: 'User Management', icon: <PeopleIcon />, description: 'User queries and pagination' },
  { id: 'todos', name: 'Todo Management', icon: <TodoIcon />, description: 'CRUD operations with mutations' },
  { id: 'dashboard', name: 'Dashboard', icon: <DashboardIcon />, description: 'Parallel and dependent queries' },
  { id: 'advanced', name: 'Advanced Features', icon: <AdvancedIcon />, description: 'Suspense and advanced patterns' },
];

const Layout: React.FC<LayoutProps> = ({ children, currentFeature, onFeatureChange }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
          TanStack Query Demo
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {features.map((feature) => (
          <ListItem key={feature.id} disablePadding>
            <ListItemButton
              selected={currentFeature === feature.id}
              onClick={() => {
                onFeatureChange(feature.id);
                setMobileOpen(false);
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>{feature.icon}</ListItemIcon>
              <ListItemText 
                primary={feature.name}
                secondary={feature.description}
                secondaryTypographyProps={{ fontSize: '0.75rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {features.find(f => f.id === currentFeature)?.name || 'TanStack Query Demo'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="xl">
          <Paper elevation={2} sx={{ p: 3, minHeight: '80vh' }}>
            {children}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
