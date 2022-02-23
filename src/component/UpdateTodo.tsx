import React, { useEffect, useState } from 'react'
import MyButton from '../utilitize/MyButton';
import { useForm } from "react-hook-form";

interface Props{
    id: string,
    fn: () => void
}
interface Todo{
    title: string,
    description: string
}

const UpdateTodo: React.FC<Props> = ({id, fn }) => {
    const [todo, setTodo] = useState<Todo | null>(null);

    const { register, handleSubmit } = useForm<Todo>();
    
    
    useEffect(() => {
        fetch(`http://localhost:5000/todos/${id}`)
            .then(res => res.json())
            .then(data => setTodo(data))
    },[id]);
    
    const onSubmit = (todoData: Todo) => {
        if (todo?.title === todoData.title && todo.description === todoData.description) return alert("You did not change anything");

        fetch(`http://localhost:5000/todos/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(todoData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    fn();
                    alert("Update successful")
                }
            })
    };

    return (
        <div onClick={fn} className='add-todo-wrapper'>
            <div
                onClick={e => e.stopPropagation()} className='add-todo-container'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col'>
                    <input
                        className="input"
                        id="demo-helper-text-aligned"
                        defaultValue={todo?.title}
                        {...register("title", { required: true })}
                        type="text"
                    />
                    <textarea
                        {...register("description", { required: true })}
                        cols={30}
                        rows={10}
                        defaultValue={todo?.description}
                        className="input"
                        placeholder='description'
                    />
                    <div className='mt-4'>
                        <MyButton type='submit'>Add Todo</MyButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateTodo