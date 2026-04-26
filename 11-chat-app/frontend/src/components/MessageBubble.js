const MessageBubble = ({ msg, user }) => {
  const isMe = msg.sender._id === user._id;
  const time = new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-md px-4 py-3 rounded-3xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] ${
        isMe 
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-4" 
          : "bg-white border border-gray-200 shadow-md mr-4"
      }`}>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {msg.content}
        </div>
        <div className={`text-xs mt-1 opacity-75 flex justify-between items-center ${
          isMe ? 'text-indigo-100' : 'text-gray-500'
        }`}>
          <span>{time}</span>
          {isMe && <span className="text-indigo-200 text-xs">✓✓</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
