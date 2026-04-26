import React from "react";

const QuoteCard = ({ quote, author }) => {
  return (
    <div style={styles.card}>
      <p style={styles.quote}>"{quote}"</p>
      <h4 style={styles.author}>- {author}</h4>
    </div>
  );
};

const styles = {
  card: {
    padding: "20px",
    borderRadius: "10px",
    background: "#f5f5f5",
    maxWidth: "500px",
    margin: "20px auto",
    textAlign: "center",
  },
  quote: {
    fontSize: "18px",
  },
  author: {
    marginTop: "10px",
  },
};

export default QuoteCard;