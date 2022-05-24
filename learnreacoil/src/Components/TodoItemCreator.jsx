import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./recoil";
// To create new todo items, we need to access a setter function that will update the contents of the todoListState. We can use the useSetRecoilState() hook to get a setter function in our TodoItemCreator component:

export default function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState); //this is setting state/value of todoListState in recoil.js

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList, //updater form of the setter function so that we can create a new todo list based on the old todo list.
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  //   same as event.target.value that we use input form
  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}
