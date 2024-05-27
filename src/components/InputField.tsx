type Props = {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
};
const InputField: React.FC<Props> = ({ task, setTask, handleSubmit }) => {
  return (
    <>
      <form className="flex mb-5" onSubmit={(e) => e.preventDefault()}>
        <input
          value={task}
          type="text"
          className="w-full py-2 px-3"
          placeholder="Add a task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 "
        >
          +
        </button>
      </form>
    </>
  );
};

export default InputField;
