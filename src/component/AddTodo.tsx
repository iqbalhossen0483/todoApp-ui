import { TextField } from '@mui/material';
import React, { useRef, useState } from 'react'
import MyButton from '../utilitize/MyButton';
import handleSubmit from "./handleSubmit";

interface Props{
    fn: () => void
}

const AddTodo: React.FC<Props> = ({ fn }) => {
    const [title, setTitle] = useState<string >("");
    const [description, setDescription] = useState<string>("");


    return (
        <div onClick={fn}  className='add-todo-wrapper'>
            <div
                onClick={e=> e.stopPropagation()} className='add-todo-container'>
                <form
                    onSubmit={e=>handleSubmit(e, title, description, fn)}
                    className='flex flex-col'>
                    <TextField
                        onChange={e=> setTitle(e.target.value)}
                        helperText="Please enter todo title"
                        required
                        id="demo-helper-text-aligned"
                        label="Title"
                    />
                    <textarea
                        onChange={e=> setDescription(e.target.value)}
                        cols={30}
                        rows={10}
                        required
                        className="border border-slate-300 px-3 py-1 rounded focus:outline-none hover:border-slate-600 focus:border-blue-400 focus:border-2"
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

export default AddTodo