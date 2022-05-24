import { useRecoilState } from "recoil";
import { todoListState } from "./recoil";

/**
 *
 * The TodoItem component will display the value of the todo item while allowing you to change its text and delete the   item. We use useRecoilState() to read todoListState and to get a setter function that we use to update the item text, mark it as completed, and delete it:
 */

export default function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  // findindex returns The index of the first element in the array that passes the test. Otherwise, -1.
  // findIndex(function(element, index) { /* ... */ })

  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
