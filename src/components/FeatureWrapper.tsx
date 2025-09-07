import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Alert,
  AlertTitle,
} from '@mui/material';

interface FeatureWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  tips?: string[];
}

const FeatureWrapper: React.FC<FeatureWrapperProps> = ({
  title,
  description,
  children,
  tips = [],
}) => {
  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Divider sx={{ my: 2 }} />
      </Box>

      {tips.length > 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>💡 Tips</AlertTitle>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {tips.map((tip, index) => (
              <li key={index}>
                <Typography variant="body2">{tip}</Typography>
              </li>
            ))}
          </ul>
        </Alert>
      )}

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        {children}
      </Paper>
    </Box>
  );
};

export default FeatureWrapper;
