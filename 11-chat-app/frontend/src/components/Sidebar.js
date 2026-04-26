import { useEffect, useState } from "react";
import axios from "../api/axios";
import { socket } from "../socket/socket";

export default function Sidebar({setSelectedChat}){
  const [chats,setChats]=useState([]);
  const [users,setUsers]=useState([]);
  const [search,setSearch]=useState("");
  const [showSearch, setShowSearch] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const loadChats = () => {
    axios.get("/api/chat",{
      headers:{Authorization:`Bearer ${user.token}`}
    }).then(res=>setChats(res.data));
  };

  const searchUsers = async () => {
    if(search.length < 2) return;
    try {
      const res = await axios.get(`/api/auth/users?search=${search}`,{
        headers:{Authorization:`Bearer ${user.token}`}
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const createChat = async (userId) => {
    try {
      const res = await axios.post("/api/chat", {userId},{
        headers:{Authorization:`Bearer ${user.token}`}
      });
      setSelectedChat(res.data);
      setShowSearch(false);
      loadChats();
    } catch (error) {
      console.error('Create chat error:', error);
    }
  };

  useEffect(()=>{
    loadChats();
    socket.emit("setup", user);
  },[]);

  return (
    <div className="w-80 bg-gradient-to-b from-gray-50 to-gray-100 p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg shadow-sm">
        <h2 className="font-bold text-lg">Messages</h2>
        <button 
          onClick={()=>setShowSearch(!showSearch)}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          ➕
        </button>
      </div>

      {/* New Chat Search */}
      {showSearch && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
          <input 
            placeholder="Search users..." 
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            onKeyUp={searchUsers}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="mt-2 max-h-48 overflow-auto">
            {users.map(u=>(
              <div key={u._id} className="p-2 hover:bg-gray-100 cursor-pointer rounded" onClick={()=>createChat(u._id)}>
                {u.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chats List */}
      <div className="flex-1 overflow-auto">
        {chats.length === 0 ? (
          <div className="text-center text-gray-500 p-8">
            No chats yet. Click ➕ to start messaging!
          </div>
        ) : (
          chats.map(chat=>(
            <div key={chat._id}
              className="p-3 bg-white mb-2 cursor-pointer hover:shadow-md rounded-lg transition-all flex items-center"
              onClick={()=>setSelectedChat(chat)}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                {chat.isGroup ? '👥' : chat.users[1]?.name?.[0] || 'U'}
              </div>
              <div>
                <div className="font-semibold text-sm">
                  {chat.isGroup ? chat.name : chat.users[1]?.name}
                </div>
                {chat.latestMessage && (
                  <div className="text-xs text-gray-500">
                    {chat.latestMessage.content?.substring(0,20)}...
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
