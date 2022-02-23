import React, { useEffect, useState } from 'react';
import UpdateTodo from "../component/UpdateTodo";

interface Props{
    fn: ()=> void
}

interface Todo{
    _id: string,
    title: string,
    description: string
}

const Todo:React.FC<Props> = ({fn}) => {
    const [showMenu, setShowMenu] = useState<number | null>(null);
    const [updateTodo, setUpdateTodo] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    function handleUpdateTodoForm(): void{
        if (updateTodo) {
        setUpdateTodo(false);
        }
        else {
        setUpdateTodo(true);
        }
    }

    //fetch all todos
    useEffect(() => {
        fetch("http://localhost:5000/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
    }, [updateTodo, fn]);


    //delete a todos
    function deleteTodo(id: string) {
        const confirm = window.confirm("Are you sure to delete");
        if (confirm) {
            fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const restTodos = todos.filter(todo => todo._id !== id);
                        setTodos(restTodos);
                        setShowMenu(todos.length);
                        alert("Delete successfull");
                    }
                });
        };
    };

    //edit & delete menu toggle
    function handleMenu(index:number, e:React.MouseEvent<HTMLElement, MouseEvent>, id:string): void{
        e.stopPropagation();
        setShowMenu(index);
        setUpdateId(id);
    }

    return (
        <div
            onClick={() => setShowMenu(null)}
            className='todo-wrapper'>
            {
                todos.map((todo, index) => {
                    return (
                        <div key={index} className='todo'>
                            <h2 className='text-center'>{todo.title}</h2>
                            <p className='text-justify'>{todo.description}</p>
                            <i
                                onClick={(e) => handleMenu(index, e, todo._id)}
                                className="fa fa-ellipsis-v icon"
                            />   
                            <div
                                style={{
                                    display: `${showMenu === index ?
                                        "block" :
                                        "none"}`
                                }}
                                onClick={e=>e.stopPropagation()}
                                className={`menu`}>
                                <button onClick={handleUpdateTodoForm}>Edit</button>
                                <button onClick={()=> deleteTodo(todo._id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }
            {/* update todo form */}
            {updateTodo &&
                <UpdateTodo
                    id={updateId}
                    fn={handleUpdateTodoForm}
                />}
        </div>
    );
}

export default Todo