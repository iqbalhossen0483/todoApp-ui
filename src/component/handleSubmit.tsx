import React from 'react'

interface todo{
    title: string,
    description: string
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>, title: string, description: string, fn: () => void) => {
    
    e.preventDefault();
    const todo = {
        title: title,
        description: description
    };

    //post todos
    postTodo(todo, fn);
};




function postTodo(todo: todo, fn: ()=> void) {
    fetch("https://todonodeapplication.herokuapp.com/todos", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(todo)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                fn()
            }
        })
}

export default handleSubmit