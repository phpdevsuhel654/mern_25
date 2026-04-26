import React, { useEffect, useState } from "react";
import { getRandomQuote } from "./services/api";
import QuoteCard from "./components/QuoteCard";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const res = await getRandomQuote();
      setQuote(res.data.content);
      setAuthor(res.data.author);
    } catch (error) {
      console.error("Error fetching quote");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Random Quote Generator</h1>

      <QuoteCard quote={quote} author={author} />

      <button onClick={fetchQuote} style={{ padding: "10px 20px" }}>
        New Quote
      </button>
    </div>
  );
}

export default App;