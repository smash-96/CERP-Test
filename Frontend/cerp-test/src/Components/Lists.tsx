import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  Fragment,
} from "react";
import { useHistory } from "react-router-dom";
import { getLists, addList, updateList } from "../API";
import ListItem from "./ListItem";
import AddList from "./AddList";
import EditModalList from "./EditModalList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Lists = () => {
  const history = useHistory();

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
  const [lists, setLists] = useState<IList[]>([]);
  const [itemList, setItemList] = useState<IList | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [dataFlag, setDataFlag] = useState<boolean>(true);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const showModal = () => setModalOpen(true);
  const hideModal = () => setModalOpen(false);

  useEffect(() => {
    fetchLists();
  }, [dataFlag]);

  const fetchLists = (): void => {
    getLists()
      .then(
        ({
          data: {
            data: { todo_lists },
          },
        }: IList[] | any) => {
          //console.log("LISTS", todo_lists);
          setLists(todo_lists);
        }
      )
      .catch((err: Error) => console.log("Fetch Lists Error", err));
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTitle(value);
  };

  const handleSubmitList = (e: FormEvent) => {
    e.preventDefault();

    addList(title)
      .then((response: any) => {
        if (response.data.status !== 200) {
          notifyError(response.data.message);
        } else {
          notifySuccess("List Added Successfully");
        }
        setDataFlag((prevState) => !prevState);
      })
      .catch((err: Error) => console.log("ADD List Error", err));

    setTitle("");
  };

  const handleEditList = (list: IList) => {
    if (!list.archived) {
      setItemList(list);
      showModal();
    } else {
      notifyError("Archived List cannot be edited");
    }
  };

  const handleArchiveList = (list: IList) => {
    const updatedList: IList = { ...list, title: "", archived: !list.archived };

    console.log("ARCHIVE LISTS", list, updatedList);
    updateList(updatedList)
      .then((response) => {
        if (list.archived) {
          notifySuccess("List Un-Archived");
        } else {
          notifySuccess("List Archived");
        }

        setDataFlag((prevState) => !prevState);
      })
      .catch((err: Error) => console.log("Archive List Error", err));
  };

  const handleForwardList = (list: IList) => {
    history.push({
      pathname: `/item/${list.id}`,
    });
  };

  return (
    <Fragment>
      {modalOpen && (
        <EditModalList
          isShowModal={modalOpen}
          hideModal={hideModal}
          itemList={itemList}
          setDataFlag={setDataFlag}
        />
      )}
      <div className="App h-screen flex justify-center items-center bg-gray-100">
        <section className="w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center">
          <h1 className="text-5xl mb-10">
            My Lists
          </h1>
          <AddList
            handleChange={handleChange}
            handleSubmitList={handleSubmitList}
            title={title}
          />
          <div className="h-10" />
          {lists.map((listItem) => (
            <ListItem
              key={listItem.id}
              list={listItem}
              handleEditList={handleEditList}
              handleArchiveList={handleArchiveList}
              handleForwardList={handleForwardList}
            />
          ))}
          {/* {!hasTodos && (
        <p className="mb-5 text-xl text-red-500 uppercase">
          Please add a todo!
        </p>
      )}
      {hasTodos && (
        <p>
          [{remainingTodos} of {todosLength}] todos remaining
        </p>
      )} */}
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

export default Lists;
