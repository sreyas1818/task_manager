import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../App.css";
import API_URL from "../config";
function ViewTask() {

    const { id } = useParams();

    const [task, setTask] = useState(null);

    useEffect(() => {

        fetch(`${API_URL}/tasks/${id}`, {

    headers: {

        Authorization: `Bearer ${localStorage.getItem("token")}`

    }

})
.then(response => {

    if(response.status===401){

        localStorage.removeItem("token");

        navigate("/login");

        return;

    }

    return response.json();

})
.then(data => {

    if(data){

        setTask(data.data);

    }

})
            .catch(error => console.log(error));

    }, [id]);

    if (!task) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (

        <div className="container">

            <div className="task-card">

    <div className="task-header">
        <h1>Task Details</h1>

        <Link to="/">
            <button className="back-btn">← Back</button>
        </Link>
    </div>

    <div className="details-grid">

        <div className="detail-box">
            <span>Title</span>
            <h3>{task.title}</h3>
        </div>

        <div className="detail-box">
            <span>Due Date</span>
            <h3>{task.due_date}</h3>
        </div>

        <div className="detail-box full-width">
            <span>Description</span>
            <p>{task.description}</p>
        </div>

        <div className="detail-box">
            <span>Priority</span>

            <div>

                <span
                    className={`priority-${task.priority.toLowerCase()}`}
                >
                    {task.priority}
                </span>

            </div>

        </div>

        <div className="detail-box">
            <span>Status</span>

            <div>

                <span
                    className={
                        task.status === "To Do"
                            ? "status-todo"
                            : task.status === "In Progress"
                            ? "status-progress"
                            : "status-done"
                    }
                >
                    {task.status}
                </span>

            </div>

        </div>

    </div>

</div>

        </div>

    );

}

export default ViewTask;