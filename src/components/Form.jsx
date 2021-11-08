import React, { useState } from 'react';
export default function Form (){
     const [todos , setTodos] = useState([]);
     const [todo, setTodo] = useState("");
     function handleSubmit(e) {
       e.preventDefault()

       const newTodo = {
         id: new Date().getTime(),
         text: todo,   
        completed: false,    
     }
     setTodos([...todos].concat(newTodo))
     setTodo("")
    }

    function deleteTodo(id) {
        const updatedTodo = [...todos].filter((todo) => todo.id !== id)
        setTodos(updatedTodo)
    }

    function toggleComplete(id) {
         const updatedTodo = [...todos].map((todo) => {
             if(todo.id === id) {
                 todo.completed = !todo.completed
             }
             return todo;
         })
         setTodos(updatedTodo)
    }
     return (
 
    <div >
       <form onSubmit ={handleSubmit}>
         <input type="text" onChange = {(e) => setTodo(e.target.value)} value = {todo} />
         <button type="submit">Add Todo</button>
       </form>
       {todos.map((todo) => <div key = {todo.id}> 
       <div>{todo.text}</div>
       <button onClick = {() => deleteTodo(todo.id)} >Complete</button>
       <input 
       type="checkbox" 
       onChange={() => toggleComplete(todo.id)}
       chacked = {todo.completed}/>
       </div>)}

    </div>
     )

}