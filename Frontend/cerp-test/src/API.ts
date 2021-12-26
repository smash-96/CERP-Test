import axios, { AxiosResponse } from "axios";

const baseUrl: string | undefined = process.env.REACT_APP_URL_PATH;

export const getLists = async (): Promise<AxiosResponse<ListApiDataType>> => {
  try {
    const lists: AxiosResponse<ListApiDataType> = await axios.get(
      baseUrl + "/api/get-lists"
    );

    return lists;
  } catch (error: any) {
    return error.response
  }
};

export const addList = async (
  title: string
): Promise<AxiosResponse<ListApiDataType>> => {
  try {
    const list: Omit<IList, "id" | "archived"> = {
      title: title,
    };
    const saveList: AxiosResponse<ListApiDataType> = await axios.post(
      baseUrl + "/api/create-list",
      list
    );
    return saveList;
  } catch (error: any) {
    return error.response
  }
};

export const updateList = async (
  list: IList
): Promise<AxiosResponse<ListApiDataType>> => {
  try {
    const listUpdate: Pick<IList, "title" | "archived"> = {
      title: list.title,
      archived: list.archived,
    };
    const updatedList: AxiosResponse<ListApiDataType> = await axios.patch(
      `${baseUrl}/api/update-list/${list.id}`,
      listUpdate
    );
    return updatedList;
  } catch (error: any) {
    return error.response
  }
};

export const addItem = async (
  description: string,
  list_id: string
): Promise<AxiosResponse<TodoApiDataType>> => {
  try {
    const todo: Omit<ITodo, "id" | "list_id" | "completed"> = {
      description: description,
    };
    const saveTodo: AxiosResponse<TodoApiDataType> = await axios.post(
      `${baseUrl}/api/add-item/${list_id}`,
      todo
    );
    return saveTodo;
  } catch (error: any) {
    return error.response
  }
};

export const getTodos = async (
  list_id: string
): Promise<AxiosResponse<TodoApiDataType>> => {
  try {
    const todos: AxiosResponse<TodoApiDataType> = await axios.get(
      `${baseUrl}/api/list-items/${list_id}`
    );
    return todos;
  } catch (error: any) {
    return error.response
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<TodoApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "description" | "completed"> = {
      description: todo.description,
      completed: todo.completed,
    };
    const updatedList: AxiosResponse<TodoApiDataType> = await axios.patch(
      `${baseUrl}/api/list-items/${todo.list_id}/item/${todo.id}`,
      todoUpdate
    );
    return updatedList;
  } catch (error: any) {
    return error.response
  }
};
