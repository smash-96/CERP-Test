import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { getLists, addList, updateList } from "../API";
import ListItem from "./ListItem";
import AddList from "./AddList";
import ItemsModal from "./ItemsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Lists = () => {
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
  const [editFlag, setEditFlag] = useState<boolean>(false);

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

    title &&
      addList(title)
        .then((response) => {
          notifySuccess("List Added Successfully");
          setDataFlag((prevState) => !prevState);
        })
        .catch((err: Error) => console.log("ADD List Error", err));

    setTitle("");
  };

  const handleEditList = (list: IList) => {
    if (!list.archived) {
      setEditFlag(true);
      setTitle(list.title);
    } else {
      notifyError("Archived List cannot be edited");
    }
  };

  const handleArchiveList = (list: IList) => {
    const updatedList: IList = { ...list, title: "", archived: !list.archived };

    console.log("ARCHIVE LISTS", list, updatedList);
    updateList(updatedList)
      .then((response) => {
        setDataFlag((prevState) => !prevState);
      })
      .catch((err: Error) => console.log("Archive List Error", err));
  };

  const handleForwardList = (list: IList) => {
    setItemList(list);
    showModal();
  };
  return (
    <>
      {modalOpen && (
        <ItemsModal
          isShowModal={modalOpen}
          hideModal={hideModal}
          itemList={itemList}
        />
      )}
      <section className="w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center">
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
    </>
  );
};

export default Lists;
