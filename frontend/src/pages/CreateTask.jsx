import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import API_URL from "../config";

function CreateTask() {

    const navigate = useNavigate();

    const [task, setTask] = useState({

        title: "",

        description: "",

        due_date: "",

        priority: "High",

        status: "To Do"

    });

    function handleChange(e) {

        setTask({

            ...task,

            [e.target.name]: e.target.value

        });

    }
    function aiSuggest() {

    if (task.title.trim() === "") {

        alert("Enter the title first.");
        return;

    }

    fetch(`${API_URL}/ai/suggest`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            title: task.title
        })
    })
    .then(res => res.json())
    .then(data => {

        setTask(prev => ({
            ...prev,
            description: data.description,
            priority: data.priority
        }));

    })
    .catch(err => console.log(err));

}

    function saveTask(e) {

        e.preventDefault();

        fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(task)
})

        .then(res => res.json())

        .then(data => {

            alert("Task Created Successfully");

            navigate("/");

        })

        .catch(err => console.log(err));

    }

    return (

        <div className="container">

            <div className="form-card">

                <h1>Create Task</h1>

                <form onSubmit={saveTask}>

                    <label>Title</label>

                    <div className="title-row">

    <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
    />

    <button
        type="button"
        className="ai-btn"
        onClick={aiSuggest}
    >
        ✨ AI Suggest
    </button>

</div>

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />

                    <label>Due Date</label>

                    <input
                        type="date"
                        name="due_date"
                        value={task.due_date}
                        onChange={handleChange}
                        required
                    />

                    <label>Priority</label>

                    <select
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >

                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>

                    </select>

                    <label>Status</label>

                    <select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >

                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>

                    </select>

                    <button className="save-btn">

                        Create Task

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateTask;