import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";
import { Slide, ToastContainer, toast } from "react-toastify";

const getItems = localStorage.getItem("todo");
const items = getItems ? JSON.parse(getItems) : [];

function App() {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(items);
  const [border, setBorder] = useState(false);
  const handleSubmit = () => {
    if (task.length === 0) {
      setBorder(true);
      toast.error("Please enter a task", {
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
      });
    } else {
      setBorder(false);
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask("");
      localStorage.setItem(
        "todo",
        JSON.stringify([...todos, { id: Date.now(), task, completed: false }])
      );
      toast.success("Task added successfully", {
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="box mb-8">
        <h1 className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-3xl text-2xl font-bold text-center mb-10">
          Mini Schedule App
        </h1>
        <InputField
          task={task}
          setTask={setTask}
          handleSubmit={handleSubmit}
          border={border}
        />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
      <p className="text-center">
        Developed by {""}
        <a
          href="https://jeremiahamir.com"
          rel="noreferrer"
          target="_blank"
          className="font-bold"
        >
          Jeremiah Amir
        </a>
      </p>
    </>
  );
}

export default App;
