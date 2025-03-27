import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { postApi } from "views/Api/comman";
import { urls } from "views/Api/constant";

const ChatAI = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

   try {
      const response = await postApi(urls.chat.create, { message: input });
      setMessages([...newMessages,
        { text: response.data?.data || "Sorry, I couldn't understand that.", sender: "bot" },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages([...newMessages, { text: "Oops! Something went wrong.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={4} sx={{ width: 400, height: 550, p: 2, display: "flex", flexDirection: "column", borderRadius: 2 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: "bold" }}>
        AI Chat Assistant
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1, p: 1, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
        {messages.map((msg, index) => (
          <Box key={index} display="flex" justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"} mb={1}>
            {msg.sender === "bot" && <Avatar sx={{ backgroundColor: "secondary.main", mr: 1 }}><SmartToyIcon /></Avatar>}
            <Typography
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: msg.sender === "user" ? "primary.main" : "grey.300",
                color: msg.sender === "user" ? "#fff" : "#000",
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </Typography>
          </Box>
        ))}
        {loading && <CircularProgress size={24} sx={{ display: "block", margin: "auto" }} />}
      </Box>

      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <IconButton color="primary" onClick={handleSend} disabled={loading || !input.trim()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};



export default ChatAI;
