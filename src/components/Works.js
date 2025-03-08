import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext'; // Import useAuth to access currentUser

function Works() {
  const { currentUser } = useAuth(); // Access currentUser from auth context
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!currentUser) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3001/api/jobs', {
          params: { skills: currentUser.skills }
        });

        if (response.data.success) {
          setJobs(response.data.jobs);
        } else {
          setError('Failed to fetch jobs.');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Error fetching jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [currentUser]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        الوظائف المناسبة لك
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <List>
          {jobs.map((job, index) => (
            <ListItem key={index} sx={{ mb: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <ListItemText
                primary={job.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textSecondary">
                      {job.company} - {job.location}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="textSecondary">
                      {job.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default Works;