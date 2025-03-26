import React, { useState } from 'react';
import { TextField, IconButton, Box, Typography, Paper, Avatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { postApi } from 'views/Api/comman';
import { urls } from 'views/Api/constant';

const ChatAI = () => {
  const [messages, setMessages] = useState([{ text: "Hi! How can I help you today?", sender: "bot" }]);
  const [input, setInput] = useState('');
  const [Data, setData] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
      setData(true);
    try {
        const response = await postApi(urls.chat.create, { message: input });
      setMessages([...newMessages, { text: response.data?.data || "Sorry, I couldn't understand that.", sender: 'bot' }]);
      } catch (error) {
        setMessages([...newMessages, { text: "Oops! Something went wrong. Please try again.", sender: 'bot' }]);
      } finally {
        setData(false);
      }
    }
  };

  return (
    <Paper elevation={4} sx={{ width: 400, height: 600, p: 2, display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
        AI Chat Assistant
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        {messages.map((msg, index) => (
          <Box key={index} display='flex' justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'} mb={1}>
            {msg.sender === 'bot' && <Avatar sx={{ bgcolor: 'secondary.main', mr: 1 }}><SmartToyIcon /></Avatar>}
            <Typography
              sx={{
                p: 1,
                borderRadius: 1,
                bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.300',
                color: msg.sender === 'user' ? '#fff' : '#000',
                maxWidth: '70%',
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        {Data && <CircularProgress size={24} sx={{ display: 'block', margin: 'auto' }} />}
      </Box>

      <Box display='flex' alignItems='center'>
        <TextField
          fullWidth
          variant='outlined'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message...'
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={Data}
        />
        <IconButton color='primary' onClick={handleSend} disabled={Data || !input.trim()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatAI;
