import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { useState, useEffect } from "react";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";

export default function ChatPage(){
  const [selectedChat,setSelectedChat]=useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate('/');
      return;
    }
    socket.emit("setup", user);
  },[]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-indigo-100 overflow-hidden">
      <Sidebar setSelectedChat={setSelectedChat}/>
      <ChatWindow selectedChat={selectedChat}/>
    </div>
  );
}
