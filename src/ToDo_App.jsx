import  { useState, useEffect } from "react";
import "./assets/App.css";

export default function ToDo_App() {
    const [takeTask, setTakeTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInput(event) {
        setTakeTask(event.target.value);
    }

    function addTask() {
        if (takeTask.trim() !== "") {
            setTasks([...tasks, takeTask]);
            setTakeTask("");
        } else {
            alert("Task can't be empty");
        }
    }

    function deleteTask(index) {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    function handleEdit(index) {
        setEditingTaskIndex(index);
        setEditedTask(tasks[index]);
    }

    function saveEdit(index) {
        if (editedTask.trim() !== "") {
            const updatedTasks = [...tasks];
            updatedTasks[index] = editedTask;
            setTasks(updatedTasks);
            setEditingTaskIndex(null);
        } else {
            alert("Task can't be empty");
        }
    }

    return (
        <div className="app-container">
            <h1 className="center todo">ToDo App</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter New Task"
                    value={takeTask}
                    onChange={handleInput}
                />
                <button className="save" onClick={addTask}>Add</button>
            </div>
            <div className="tasks-list-container">
                <ol className="tasks-list">
                    {tasks.map((task, index) => (
                        <li key={index} className="task-item">
                            {index === editingTaskIndex ? (
                                <div className="edit-container">
                                    <input
                                        type="text"
                                        value={editedTask}
                                        onChange={(e) => setEditedTask(e.target.value)}
                                    />
                                    <button className="save" onClick={() => saveEdit(index)}>Save</button>
                                </div>
                            ) : (
                                <div className="task-container">
                                    <span className="task-text">{task}</span>
                                    <div className="task-buttons">
                                        <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
