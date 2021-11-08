import React, { useState , useEffect} from 'react';
export default function Form (){
     const [todos , setTodos] = useState([]);

     const [todo, setTodo] = useState("");

     const [todoEditing , setTodoEditing] = useState(null);
     const [editingText, setEditingText] = useState("");
     
     useEffect(() => {
         const temp = localStorage.getItem("todos");
         const loadedTodos = JSON.parse(temp);
         if(loadedTodos) {
             setTodos(loadedTodos)
         }
             },[])


     useEffect(() => {
         const temp = JSON.stringify(todos)
         localStorage.setItem("todos", temp)
        },[todos]);

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

    function editTodo(id) {
        const updatedTodo = [...todos].map((todo) => {
            if(todo.id === id){
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodo);
        setTodoEditing(null);
        setEditingText('')
    }
     return (
 
    <div >
       <form onSubmit ={handleSubmit}>
         <input type="text" onChange = {(e) => setTodo(e.target.value)} value = {todo} />
         <button type="submit">Add Todo</button>
       </form>
       {todos.map((todo) => <div key = {todo.id}> 

       {todoEditing === todo.id ? (  <input
       type="text"
       onChange = {(e) => setEditingText(e.target.value)}
       value={editingText}/>)
        :
         ( <div>{todo.text}</div>)}
      
     

       <button onClick = {() => deleteTodo(todo.id)} >Complete</button>
       <input 
       type="checkbox" 
       onChange={() => toggleComplete(todo.id)}
       chacked = {todo.completed}/>

       {
           todoEditing === todo.id ? ( <button onClick={() => editTodo(todo.id)}>submit Edits</button>) :
            (<button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>)
       }
  
   
       </div>)}

    </div>
     )

}