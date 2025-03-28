

import {useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useSpeechToText from "react-hook-speech-to-text";
import TextToSpeech from "react-text-to-speech";
import { PET_SHOP_CONTEXT } from "./aiContext";


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

const ChatGPTClone = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  console.log("api_key :",api_key);
  
  const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: "bot" },
       ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    isRecording,
    startSpeechToText,
    stopSpeechToText,
    interimResult,
   results,
  } = useSpeechToText({ continuous: false });

  // Update input field with spoken text
  // console.log(results,"result");
  console.log(interimResult,"interimResult");


  useEffect(() => {
    if (interimResult) {
      // setInput(interimResult || results.join(" "));
      setInput(interimResult);

     }
   }, [interimResult]);

   // Handle voice input start/stop
   const handleVoiceInput = () => {
         if (isRecording) {
           stopSpeechToText();
         } else {
          startSpeechToText();
         }
       };

    const handleSend = async () => {
      if (!input.trim()) return;

     const newMessages = [...messages, { text: input, sender: "user" }];
     setMessages([...newMessages, { text: "Generating...", sender: "bot" }]);
      setInput(""); 
      setLoading(true);

   try {
       const { GoogleGenerativeAI } = await import("@google/generative-ai");
       const genAI = new GoogleGenerativeAI(api_key);
       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

       const prompt = `${PET_SHOP_CONTEXT} ${input}`;
       console.log("prompt :",prompt);
      
       const result = await model.generateContent(prompt);
       console.log("result :",result);


        const reply = result.response.text();
        console.log("reply :",reply);
      
        setMessages([...newMessages, { text: reply, sender: "bot" }]);
      } catch (error) {
        console.error("Error generating response:", error);
        setMessages([...newMessages, { text: "Oops! Something went wrong.", sender: "bot" }]);
      }
      setLoading(false);
    };

    console.log("final messages :",messages);
  
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
           placeholder="Type a message or use voice..."
           onKeyDown={(e) => e.key === "Enter" && handleSend()}
           disabled={loading}
         />
         <IconButton color="secondary" onClick={handleVoiceInput} disabled={loading}>
           {isRecording ? "🎙️" : "🎤"}
         </IconButton>
         <IconButton color="primary" onClick={handleSend} disabled={loading || !input.trim()}>
           <SendIcon />
         </IconButton>
      </Box>
   </Paper>
   );
};



  export default ChatGPTClone;
//  import { useState, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import useSpeechToText from "react-hook-speech-to-text";
// import TextToSpeech from "react-text-to-speech";
// import { PET_SHOP_CONTEXT } from "./aiContext";

// const ChatGPTClone = () => {
//   const api_key = process.env.REACT_APP_API_KEY;
//   console.log("api_key :",api_key);
  
//   const [messages, setMessages] = useState([
//     { id: 1, message: "Hello! How can I assist you today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const {
//     isRecording,
//     startSpeechToText,
//     stopSpeechToText,
//     interimResult,
//     // results,
//   } = useSpeechToText({ continuous: false });

//   // Update input field with spoken text
//   // console.log(results,"result");
//   console.log(interimResult,"interimResult");
//   useEffect(() => {
//     if (interimResult) {
//       // setInput(interimResult || results.join(" "));
//       setInput(interimResult);

//     }
//   }, [interimResult]);

//   // Handle voice input start/stop
//   const handleVoiceInput = () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage = { id: 0, message: input };
//     setMessages([...messages, userMessage, { id: 1, message: "Generating..." }]);
//     setInput(""); 
//     setLoading(true);

//     try {
//       const { GoogleGenerativeAI } = await import("@google/generative-ai");
//       const genAI = new GoogleGenerativeAI(api_key);
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       const prompt = `${PET_SHOP_CONTEXT} ${input}`;
//       console.log("prompt :",prompt);
      
//       const result = await model.generateContent(prompt);
//       console.log("result :",result);


//       const reply = result.response.text();
//       console.log("reply :",reply);
      
//       setMessages((prev) => [...prev.slice(0, -1), { id: 1, message: reply }]);
//     } catch (error) {
//       console.error("Error generating response:", error);
//       setMessages((prev) => [
//         ...prev.slice(0, -1),
//         { id: 1, message: "❌ Error: Could not fetch response." },
//       ]);
//     }
//     setLoading(false);
//   };

//   console.log("final messages :",messages);
  

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Samyotech AI</h2>
//       <div style={styles.chatBox}>
//         {messages.map((msg, index) => (
//           <MarkdownRenderer key={index} text={msg.message} isUser={msg.id === 0} />
//         ))}
//       </div>
//       <div style={styles.inputContainer}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message or use voice..."
//           style={styles.input}
//           onKeyPress={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleVoiceInput} style={styles.voiceButton}>
//           {isRecording ? "🎙️ Stop" : "🎤 Voice"}
//         </button>
//         <button onClick={handleSend} style={styles.button} disabled={loading}>
//           {loading ? "Thinking..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const MarkdownRenderer = ({ text, isUser }) => {
//   return (
//     <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
//       <div
//         style={{
//           ...styles.message,
//           backgroundColor: isUser ? "#DCF8C6" : "#ECECEC",
//           alignSelf: isUser ? "flex-end" : "flex-start",
//           borderRadius: isUser ? "15px 15px 0 15px" : "15px 15px 15px 0",
//         }}
//       >
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             code({ inline, className, children }) {
//               const match = /language-(\w+)/.exec(className || "");
//               return !inline && match ? (
//                 <SyntaxHighlighter style={atomOneDark} language={match[1]} PreTag="div">
//                   {String(children).replace(/\n$/, "")}
//                 </SyntaxHighlighter>
//               ) : (
//                 <code style={{ backgroundColor: "#F5F5F5", padding: "2px 4px", borderRadius: "4px" }}>
//                   {children}
//                 </code>
//               );
//             },
//           }}
//         >
//           {text}
//         </ReactMarkdown>
//         <TextToSpeech text={text} />
//       </div>
//     </div>
//   );
// };

const styles = {
  container: { width: "800px", margin: "20px auto", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", backgroundColor: "#F9F9F9", display: "flex", flexDirection: "column" },
  title: { textAlign: "center", fontSize: "20px", fontWeight: "bold", marginBottom: "10px" },
  chatBox: { flex: 1, height: "400px", overflowY: "auto", padding: "10px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "10px" },
  inputContainer: { display: "flex", borderTop: "1px solid #ccc", padding: "10px" },
  input: { flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { marginLeft: "10px", padding: "8px 15px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  voiceButton: { marginLeft: "10px", padding: "8px 15px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" },
  message: { padding: "8px 12px", maxWidth: "80%", fontSize: "14px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" },
};

// export default ChatGPTClone;