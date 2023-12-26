import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../TodoDelete/Todo";
// import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(readTodo());

  const handleAdd = (todo) => setTodos([...todos, todo]);

  const handleUpdate = (updated) =>
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));

  const handleDelete = (deleted) =>
    setTodos(todos.filter((t) => t.id !== deleted.id));

  const filtered = getFilteredItems(todos, filter);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="container">
      <ul className="ul">
        {filtered.map((item, index) => (
          <li className="list">
            <Todo
              key={index}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
      <AddTodo className="Addlist" onAdd={handleAdd} />
    </section>
  );
}

function readTodo() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
  if (filter === "All") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
