import React from 'react'
import { useTodo } from '../contexts/TodoContext';
import { FaEdit,FaSave  } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = React.useState(false);
    const [todoMsg, setTodoMsg] = React.useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { todo: todoMsg });
        setIsTodoEditable((prev) => !prev);
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            <button
                className="inline-flex w-8 h-8 rounded-lg text-2xl  justify-center items-center shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <FaSave/> : <FaEdit/>}
            </button>
       
            <button
                className="inline-flex w-8 h-8 rounded-lg text-3xl  justify-center items-center  shrink-0 "
                onClick={() => deleteTodo(todo.id)}
            >
                <MdDeleteForever/>
            </button>
        </div>
    );
}

export default TodoItem;
