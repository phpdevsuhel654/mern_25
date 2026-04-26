import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { socket } from "../socket/socket";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({selectedChat}){
  const [messages,setMessages]=useState([]);
  const [typing, setTyping] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(()=> {
    if(!selectedChat) return;

    axios.get(`/api/message/${selectedChat._id}`,{
      headers:{Authorization:`Bearer ${user.token}`}
    }).then(res=>setMessages(res.data));

    socket.emit("join_chat", selectedChat._id);

  },[selectedChat]);

  useEffect(()=>{
    const handleMessageReceived = (msg) => {
      // Prevent duplicate if message already exists
      setMessages(prev => {
        if (prev.some(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    };

    socket.on("message_received", handleMessageReceived);
    socket.on("typing", () => setTyping(true));
    socket.on("stop_typing", () => setTyping(false));

    return () => {
      socket.off("message_received", handleMessageReceived);
      socket.off("typing");
      socket.off("stop_typing");
    };
  },[selectedChat]);

  if(!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-2xl">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 4.03 9 8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Messages</h2>
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  const chatTitle = selectedChat.isGroup ? selectedChat.name : selectedChat.users.find(u => u._id !== user._id)?.name || 'Chat';

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm p-4 flex items-center">
        <div>
          <h3 className="font-bold text-gray-800 text-xl">{chatTitle}</h3>
          {typing && <p className="text-xs text-green-500 font-medium">Someone is typing...</p>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {messages.map(m=>(
          <MessageBubble key={m._id} msg={m} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput selectedChat={selectedChat} setMessages={setMessages}/>
    </div>
  );
}
