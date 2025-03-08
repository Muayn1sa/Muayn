// Manager.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMessages } from '../context/MessageContext';  // تأكد من المسار الصحيح

function Manager() {
  const { messages, setMessages } = useMessages();  // استخدام الـ Context

  useEffect(() => {
    // Fetch messages from the server when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages'); // Use relative path to fetch from the server
        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (error) {
      }
    };

    fetchMessages();
  }, [setMessages]);

  return (
    <Box sx={{ p: 10 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        إدارة الموقع
      </Typography>
      <Paper sx={{ p: 2, direction: 'rtl' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          الرسائل الواردة
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => setMessages(prevMessages => prevMessages.filter((_, i) => i !== index))}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText
                primary={`من: ${message.name} (${message.email})`}
                secondary={`رسالة: ${message.message}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Manager;