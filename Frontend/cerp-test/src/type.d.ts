interface IList {
  id: string;
  title: string;
  archived: boolean;
  inserted?: string;
  updated?: string;
}

interface ITodo {
  id: string;
  list_id: string;
  description: string;
  completed: boolean;
  inserted?: string;
  updated?: string;
}

type ListProps = {
  list: IList;
};
type TodoProps = {
  todo: ITodo;
};

type ListApiDataType = {
  message: string;
  status: string;
  lists?: IList[];
  list?: IList;
};
type TodoApiDataType = {
  message: string;
  status: string;
  todos?: ITodo[];
  todo?: ITodo;
};
