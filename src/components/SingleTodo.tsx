import { FaCheck, FaPenToSquare, FaTrash } from "react-icons/fa6";
import { Slide, toast } from "react-toastify";
import { Todo } from "../types/todo";
import { useState } from "react";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.task);
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    localStorage.setItem(
      "todo",
      JSON.stringify(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      "todo",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
    toast("Task deleted successfully", {
      autoClose: 2000,
      theme: "dark",
      transition: Slide,
    });
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, task: editTodo } : todo))
    );
    localStorage.setItem(
      "todo",
      JSON.stringify(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task: editTodo } : todo
        )
      )
    );
    toast.success("Task updated successfully", {
      autoClose: 2000,
      theme: "dark",
      transition: Slide,
    });
    setEdit(false);
  };
  const handleEdit = () => {
    setEdit(!edit);
    if (todo.completed) {
      toast.info("Completed tasks cannot be edited", {
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
      });
    }
  };
  return (
    <>
      <div
        className={` text-white py-3 px-4 mb-3 hover:scale-105 transition-all cursor-pointer ${
          todo.completed ? "bg-green-900" : "bg-[#161822]"
        }`}
        key={todo.id.toString()}
      >
        <form onSubmit={(e) => handleSubmit(e, todo.id)}>
          <div
            className="flex justify-between items-center"
            id={todo.id.toString()}
          >
            {edit && !todo.completed ? (
              <input
                type="text"
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="w-full bg-[#25283c] py-2 px-2 mr-5"
              />
            ) : (
              <p
                className={`${todo.completed ? "line-through" : ""} font-bold `}
              >
                {todo.task}
              </p>
            )}

            <ul className="flex gap-x-3">
              <li>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-yellow-700 hover:bg-yellow-500  text-white font-bold py-1.5 px-1.5"
                >
                  <FaPenToSquare className="text-sm" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="bg-red-700 hover:bg-red-500  text-white font-bold py-1.5 px-1.5"
                  onClick={() => handleDelete(todo.id)}
                >
                  <FaTrash className="text-sm" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="bg-green-700 hover:bg-green-500  text-white font-bold py-1.5 px-1.5"
                  onClick={() => handleDone(todo.id)}
                >
                  <FaCheck className="text-sm" />
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleTodo;
