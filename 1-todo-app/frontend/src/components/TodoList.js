import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onUpdate, onDelete }) {
  console.log("Rendering TodoList with todos:", todos); // 🔍 debug

  if (!todos || todos.length === 0) {
    return <p>No todos found</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;