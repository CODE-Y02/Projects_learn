import { atom, selector } from "recoil";

// Atoms contain the source of truth for our application state. In our todo-list, the source of truth will be an array of objects, with each object representing a todo item.

// export is put because we are using it in other file(outside crr file) read docs

export const todoListState = atom({
  key: "TodoList", //unique key
  default: [], // default value or initial state
});

const todoListFilterState = atom({
  key: "TodoListFilter",
  default: "Show All",
});

// selects value from parent atom states return something
export const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
// We give our atom a unique key and set the default value to an empty array. To read the contents of this atom, we can use the useRecoilValue() hook in our TodoList component
