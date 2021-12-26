import { TodoProps } from "../types";
import { ReactComponent as EditIcon } from "../assets/svg/edit.svg";
export const Row = ({
  todo,
  todo: { id, description, completed },
  handleCompleteTodo,
  handleEditTodo,
}: TodoProps) => (
  <div
    className={`
        flex w-full p-4 mb-2 justify-between items-center
       ${completed ? "bg-gray-400 " : "bg-green-300"}
      `}
  >
    <p
      className={`
          ml-2 text-xl font-sans font-medium
          ${completed ? "text-white line-through" : "text-gray-700"}
        `}
    >
      {description}
    </p>
    <div className="w-1/6 flex justify-between items-center mr-2">
      <button
        type="submit"
        aria-label="Edit list"
        className="h-7 w-7 flex justify-center items-center text-black font-bold  rounded"
        onClick={() => handleEditTodo(todo)}
      >
        <EditIcon />
      </button>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => handleCompleteTodo(todo)}
        className="form-checkbox h-7 w-7"
      />
    </div>
  </div>
);
