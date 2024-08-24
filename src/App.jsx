import { useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { FaHandHoldingMedical,FaBriefcaseMedical,FaStethoscope,FaFileMedicalAlt } from "react-icons/fa";
import { BiSolidInjection } from "react-icons/bi";

function App() {

const [todos, setTodos] = useState([]);

const addTodo = (todo) => { 
  setTodos((prev)=>[{id: Date.now(),...todo},...prev]);
}

const updateTodo = (id, todo) => {
  setTodos((prev)=>prev.map((t)=>t.id === id ? todo : t));
}

const deleteTodo = (id) => {
  setTodos((prev)=>prev.filter((t)=>t.id !== id));
}

const toggleComplete = (id) => {
  setTodos((prev)=>prev.map((t)=>t.id === id ? {...t, completed: !t.completed} : t));
}

useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if(todos && todos.length > 0){
    setTodos(todos);
  }
}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}> 
    <>
      <div className=" w-full min-h-screen m-0 p-10 " 
       style={{
                backgroundImage: `url('https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
                backgroundSize: "cover",
            }}>
        <div className="w-full  bg-[#172842] max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white" >
          <div className="flex  gap-5 justify-center p-5 text-4xl"><FaHandHoldingMedical/> <FaBriefcaseMedical/> <FaStethoscope/> <BiSolidInjection/> <FaFileMedicalAlt/></div>
          <h1 className="text-2xl font-bold  text-center mb-8 mt-2">Manage Your Task Dr. Anjali </h1>
          <div className="mb-4" >
           <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
              <TodoItem key={todo.id} todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
    </TodoProvider> 
  );
}

export default App;
