import React, { useState } from 'react';

function Todo() {
    const [todo, setTodo] = useState([
        {
            message: "Demo 1",
            id: 1
        },
        {
            message: "Demo 2",
            id: 2
        },
        {
            message: "Demo 3",
            id: 3
        }
    ])
    const [text, setText] = useState('')
    function changeText(event) {
        setText(event.target.value)
    }
    function addTodo() {
        setTodo([...todo, { message: text, id: todo.length + 1 }])
        setText('');
    }
    function removeTodo(id) {
        console.log(id)
        let newArray = todo.filter(function (obj) {
            return obj.id != id
        })
        console.log(newArray)
        setTodo([...newArray])
    }
    return (
        <div className='m-auto'>
            <input className='border border-black m-4 h-10 w-80 p-4 rounded-lg' value={text} onChange={changeText} />
            <button className='border-2 border-blue-400 p-1 rounded-md bg-blue-400 text-white font-bold' onClick={addTodo}>Add</button>
            <hr />
            <br />
            <div className='flex justify-center'>
                <ul className='w-1/2'>
                    {
                        todo.map(function (obj) {
                            return (
                                <li className="text-2xl m-4">➡️&nbsp;&nbsp;{obj.message}&nbsp;&nbsp;<button className='hover:scale-110' onClick={() => { removeTodo(obj.id) }}>❌</button></li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo