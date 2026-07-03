import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import API_URL from "../config";
function EditTask() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "",
        status: ""
    });

    useEffect(() => {

        fetch(`${API_URL}/tasks/${id}`, {

    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

})
.then(res => {

    if (res.status === 401) {

        localStorage.removeItem("token");

        navigate("/login");

        return;

    }

    return res.json();

})
.then(data => {

    if (data) {

        setTask(data.data);

    }

});

    }, [id]);

    function handleChange(e) {

        setTask({
            ...task,
            [e.target.name]: e.target.value
        });

    }

    function updateTask(e) {

        e.preventDefault();

        fetch(`${API_URL}/tasks/${id}`, {

            method: "PUT",

            headers: {

    "Content-Type": "application/json",

    Authorization: `Bearer ${localStorage.getItem("token")}`

},

            body: JSON.stringify(task)

        })

        .then(res => res.json())

        .then(() => {

            alert("Task Updated Successfully");

            navigate("/");

        });

    }

    return (

        <div className="container">

            <div className="form-card">

                <h1>Edit Task</h1>

                <form onSubmit={updateTask}>

                    <label>Title</label>

                    <input
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                    />

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />

                    <label>Due Date</label>

                    <input
                        type="date"
                        name="due_date"
                        value={task.due_date}
                        onChange={handleChange}
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
                        Update Task
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditTask;