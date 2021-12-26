import { AddListProps } from "../types"
import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg"

const AddList = ({
    handleSubmitList,
    title,
    handleChange,
  }: AddListProps) => {
    return (
        <form className="flex justify-between w-full" onSubmit={handleSubmitList}>
        <input
          type="text"
          name="title"
          value={title}
          className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
          onChange={handleChange}
        />
        <button type="submit" aria-label="Add todo">
          <PlusIcon />
        </button>
      </form>
    )
}

export default AddList
