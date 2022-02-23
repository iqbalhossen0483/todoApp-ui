import { useState } from "react";
import AddTodo from "./component/AddTodo";
import Todo from "./component/Todo";
import MyButton from "./utilitize/MyButton";


function App() {
  const [addTodo, setAddTodo] = useState<boolean>(false);

  function handleAddTodoForm(): void{
    if (addTodo) {
      setAddTodo(false);
    }
    else {
      setAddTodo(true);
    }
  }

  return (
    <div>
      {/* add todo button */}
      <div className="my-5">
        <MyButton fn={handleAddTodoForm}>add todo</MyButton>
      </div>

      {/* todo component */}
      <Todo fn={handleAddTodoForm} />

      {/* add todo form */}
      {addTodo && <AddTodo fn={handleAddTodoForm} />}
    </div>
  );
}

export default App;
