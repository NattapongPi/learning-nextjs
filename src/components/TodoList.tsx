"use client";
import { Todo } from "@/types/todo";
import { toggleTodo, deleteTodo } from "@/app/todos/actions";
import { useState } from "react";

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [filter, setFilter] = useState("all");
  const callToggleTodo = async (todo: Todo) => {
    const response = await toggleTodo({ message: "" }, todo);
    if (response.success) {
    }
  };
  const callDeleteTodo = async (id: string) => {
    const response = await deleteTodo({ message: "" }, id);
    if (response.success) {
      alert(response.message);
    }
  };
  return (
    <>
      <div className="flex justify-center mt-4">
        <select
          name="filter"
          id="filter"
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 cursor-pointer"
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="notDone">Not Done</option>
        </select>
      </div>
      <ul className="text-center mt-4">
        {todos
          .filter((todo: Todo) =>
            filter === "all" ? true : todo.isDone === (filter === "done")
          )
          .map((todo: Todo) => (
            <li key={todo.id} className="flex justify-center gap-4 mb-2">
              <div
                className="border border-gray-300 rounded px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => callToggleTodo(todo)}
              >
                {todo.isDone ? <s>{todo.todo}</s> : <span>{todo.todo}</span>}
              </div>
              <div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors cursor-pointer"
                  onClick={() => callDeleteTodo(todo.id)}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
