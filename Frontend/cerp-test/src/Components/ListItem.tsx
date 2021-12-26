import React from "react";
import { ListProps } from "../types";
import { ReactComponent as ForwardIcon } from "../assets/svg/forward.svg";
import { ReactComponent as EditIcon } from "../assets/svg/edit.svg";
import { ReactComponent as ArchiveIcon } from "../assets/svg/archive.svg";
const ListItem = ({
  list,
  list: { id, title, archived },
  handleArchiveList,
  handleEditList,
  handleForwardList,
}: ListProps) => {
  return (
    <div
      className={`
        flex w-full p-4 mb-2 justify-between items-center
        ${archived ? "bg-gray-400 " : "bg-green-300"}
      `}
    >
      <p
        className={`
          ml-2 text-xl font-sans font-medium text-gray-700`}
      >
        {title}
      </p>
      <div className="w-1/6 flex justify-between items-center mr-2">
        <button
          type="submit"
          aria-label="Edit list"
          className="h-7 w-7 flex justify-center items-center text-black font-bold  rounded"
          onClick={() => handleEditList(list)}
        >
          <EditIcon />
        </button>

        <button
          type="submit"
          aria-label="Archive"
          className="h-7 w-7 flex justify-center items-center text-black font-bold  rounded"
          onClick={() => handleArchiveList(list)}
        >
          <ArchiveIcon />
        </button>

        <button
          type="submit"
          aria-label="Forward"
          className="h-7 w-7 flex justify-center items-center text-black font-bold  rounded"
          onClick={() => handleForwardList(list)}
        >
          <ForwardIcon />
        </button>
        {/* <button
          aria-label="Delete a todo"
          className="h-7 w-7 flex justify-center items-center bg-red-400 hover:bg-red-500 text-white font-bold  rounded"
          //onClick={() => handleDeleteTodo(id)}
        >
          X
        </button>
        <input
          type="checkbox"
          //checked={isCompleted}
          //onChange={() => handleCheckTodo(id)}
          className="form-checkbox h-7 w-7"
        /> */}
      </div>
    </div>
  );
};

export default ListItem;
