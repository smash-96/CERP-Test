import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  Fragment,
} from "react";
import { useParams } from "react-router-dom";
import { getTodos, addItem, updateTodo } from "../API";
import { Row } from "./Row";
import { AddTodo } from "./AddTodo";
import EditModalItem from "./EditModalItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Todos = () => {
  const { listId } = useParams<{ listId?: string }>();
  const notifyError = (error: string) =>
    toast.error(error, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccess = (successMsg: string) =>
    toast.success(successMsg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [task, setTask] = useState("");
  const [itemTodo, setItemTodo] = useState<ITodo | undefined>(undefined);

  const [dataFlag, setDataFlag] = useState<boolean>(true);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  useEffect(() => {
    fetchTodos();
  }, [dataFlag]);

  const fetchTodos = (): void => {
    getTodos(listId!)
      .then(
        ({
          data: {
            data: { list_items },
          },
        }: ITodo[] | any) => {
          console.log("TODOS", list_items);
          setTodos(list_items);
        }
      )
      .catch((err: Error) => console.log("Fetch Todos Error", err));
  };
  const todosLength = todos.length;
  const hasTodos = todos.length > 0;
  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  };

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault();

    addItem(task, listId!)
      .then((response: any) => {
        if (response.data.status !== 200) {
          notifyError(response.data.message);
        } else {
          notifySuccess("Item Added Successfully");
        }
        setDataFlag((prevState) => !prevState);
      })
      .catch((err: Error) => console.log("ADD Item Error", err));

    setTask("");
  };

  const handleCompleteTodo = (todo: ITodo) => {
    const updatedTodo: ITodo = {
      ...todo,
      description: "",
      completed: !todo.completed,
    };

    console.log("COMPLETE ITEMS", todo, updatedTodo);
    updateTodo(updatedTodo)
      .then((response: any) => {
        console.log("RESPONSE", response);
        if (response.data.status !== 200) {
          notifyError(response.data.message);
        }
        setDataFlag((prevState) => !prevState);
      })
      .catch((err) => console.log("Complete Item Error", err));
  };

  const handleEditTodo = (todo: ITodo) => {
    setItemTodo(todo);
    showModal();
  };

  return (
    <Fragment>
      {modalOpen && (
        <EditModalItem
          isShowModal={modalOpen}
          hideModal={hideModal}
          itemTodo={itemTodo}
          setDataFlag={setDataFlag}
        />
      )}
      <div className="App h-screen flex justify-center items-center bg-gray-100">
        <section className="relative w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center">
          <h1 className="text-5xl mb-10">My Tasks</h1>
          <AddTodo
            handleChange={handleChange}
            handleSubmitTodo={handleSubmitTodo}
            task={task}
          />
          <div className="h-10" />
          {todos.map((todo) => (
            <Row
              key={todo.id}
              todo={todo}
              handleCompleteTodo={handleCompleteTodo}
              handleEditTodo={handleEditTodo}
            />
          ))}
          {!hasTodos && (
            <p className="mb-5 text-xl text-red-500 uppercase">
              Please add a todo!
            </p>
          )}
          {hasTodos && (
            <p>
              [{remainingTodos} of {todosLength}] todos remaining
            </p>
          )}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </section>
      </div>
    </Fragment>
  );
};
