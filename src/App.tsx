import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./types/todo";
import { Slide, ToastContainer, toast } from "react-toastify";

function App() {
  const [task, setTask] = useState<string>("");
  const [todo, setTodo] = useState<Todo[]>([]);
  const handleSubmit = () => {
    if (task.length === 0) {
      toast.error("Please enter a task", {
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="py-16">
        <div className="md:w-4/12 mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10">
            Mini Schedule App
          </h1>
          <InputField
            task={task}
            setTask={setTask}
            handleSubmit={handleSubmit}
          />
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
