import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import { socket } from "../socket/socket";

export default function MessageInput({selectedChat,setMessages}){
  const [content,setContent]=useState("");
  const [typing, setTyping] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const typingTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
  }, []);

  const handleTyping = (e) => {
    setContent(e.target.value);
    if (!typing) {
      socket.emit("typing", selectedChat._id);
      setTyping(true);
    }

    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      socket.emit("stop_typing", selectedChat._id);
      setTyping(false);
    }, 1000);
  };

  const send = async ()=>{
    if(content.trim() === '') return;

    const {data} = await axios.post("/api/message",
      {content: content.trim(),chatId:selectedChat._id},
      {headers:{Authorization:`Bearer ${user.token}`}}
    );

    setMessages(prev=>[...prev,data]);
    socket.emit("new_message", data);
    setContent("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-end space-x-3">
        <div className="flex-1">
          <textarea
            value={content}
            onChange={handleTyping}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            rows="1"
            className="w-full p-4 pr-12 border border-gray-200 rounded-3xl resize-none focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50 hover:bg-white shadow-sm max-h-24 scrollbar-thin"
          />
        </div>
        <button
          onClick={send}
          disabled={content.trim() === ''}
          className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          title="Send message"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1 ml-1">
        {typing ? 'Typing...' : 'Press Enter to send'}
      </p>
    </div>
  );
}
