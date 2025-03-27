import React, { useState } from 'react';
import { TextField, IconButton, Box, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatAI = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
      
      setTimeout(() => {
        setMessages([...newMessages, { text: 'Let me think...', sender: 'bot' }]);
      }, 1000);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: 400, height: 500, p: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 1 }}>
        {messages.map((msg, index) => (
          <Typography
            key={index}
            align={msg.sender === 'user' ? 'right' : 'left'}
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.300',
              color: msg.sender === 'user' ? '#fff' : '#000',
              mb: 1
            }}
          >
            {msg.text}
          </Typography>
        ))}
      </Box>
      <Box display='flex' alignItems='center'>
        <TextField
          fullWidth
          variant='outlined'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
        />
        <IconButton color='primary' onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatAI;
