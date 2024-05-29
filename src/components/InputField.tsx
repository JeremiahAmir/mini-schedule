import { FaPlus } from "react-icons/fa6";

type Props = {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
  border: boolean;
};
const InputField: React.FC<Props> = ({
  task,
  setTask,
  handleSubmit,
  border,
}) => {
  return (
    <>
      <form className="flex mb-5" onSubmit={(e) => e.preventDefault()}>
        <input
          value={task}
          type="text"
          className={`w-full py-4 px-5 outline-none  ${
            border ? "border-red-700 border-solid border-2" : "border-none"
          }`}
          placeholder="Add a task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-black hover:bg-gray-700 text-white font-bold py-4 px-6 "
        >
          <FaPlus />
        </button>
      </form>
    </>
  );
};

export default InputField;
