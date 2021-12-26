import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react"

export type ListProps = {
  list: IList
  handleArchiveList: (list: IList) => void
  handleEditList: (list: IList) => void
  handleForwardList: (list: IList) => void

}
export type AddListProps = {
  title: string
  handleSubmitList: (e: FormEvent) => void
  handleChange: (e: ChangeEvent) => void
}


export type TodoProps = {
  todo: ITodo
  handleCompleteTodo: (todo: ITodo) => void
  handleEditTodo: (todo: ITodo) => void
}

export type AddTodoProps = {
  task: string
  handleSubmitTodo: (e: FormEvent) => void
  handleChange: (e: ChangeEvent) => void
}

export type EditModalListProps = {
  itemList: IList | undefined
  isShowModal: boolean
  setDataFlag: Dispatch<SetStateAction<boolean>>
  hideModal: () => void
}

export type EditModalTodoProps = {
  itemTodo: ITodo | undefined
  isShowModal: boolean
  setDataFlag: Dispatch<SetStateAction<boolean>>
  hideModal: () => void
}
