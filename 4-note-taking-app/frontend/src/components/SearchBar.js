import React, { useEffect, useState } from "react";

const SearchBar = ({ setKeyword }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <input
      type="text"
      placeholder="🔍 Search notes..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="w-full p-3 border rounded-xl shadow-sm focus:outline-none"
    />
  );
};

export default SearchBar;