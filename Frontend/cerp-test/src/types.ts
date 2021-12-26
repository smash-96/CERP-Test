import { ChangeEvent, FormEvent } from "react"

export type Todo = {
  id: string
  task: string
  isCompleted: boolean
}

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
  todo: Todo
  handleCheckTodo: (id: string) => void
  handleDeleteTodo: (id: string) => void
}

export type AddTodoProps = {
  task: string
  handleSubmitTodo: (e: FormEvent) => void
  handleChange: (e: ChangeEvent) => void
}


export type ItemsModalProps = {
  hideModal: () => void
  isShowModal: boolean
  itemList: IList | undefined
}