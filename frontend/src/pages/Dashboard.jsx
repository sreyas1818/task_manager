import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import API_URL from "../config";
function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  function loadTasks() {

    let url = `${API_URL}/tasks`;

    const params = [];

    if (status !== "") {
      params.push(`status=${encodeURIComponent(status)}`);
    }

    if (priority !== "") {
      params.push(`priority=${encodeURIComponent(priority)}`);
    }

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    fetch(url, {

    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }

})
      .then(res => {

    if(res.status===401){

        localStorage.removeItem("token");

        navigate("/login");

        return;
    }

    return res.json();

})
.then(data => {

    if(data){

        setTasks(data.data);

    }

})
      .catch(err => console.log(err));
  }
  function deleteTask(id) {

    if (!window.confirm("Are you sure you want to delete this task?")) {
        return;
    }

    fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})
    .then(res => res.json())
    .then(() => {
        loadTasks();
    })
    .catch(err => console.log(err));

}
function logout() {

    localStorage.removeItem("token");

    navigate("/login");

}

useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

        navigate("/login");

        return;

    }

    loadTasks();

}, []);

  return (
    <div className="container">

<div className="dashboard-header">

    <h1>Task Dashboard</h1>

    <div className="header-buttons">

    <Link to="/create">
        <button className="create-btn">
            + Create Task
        </button>
    </Link>

    <button
        className="logout-btn"
        onClick={logout}
    >
        Logout
    </button>

</div>

</div>

      <div className="filters">

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={loadTasks}>
          Search
        </button>

      </div>

      <div className="table-container">

    <table>

        <thead>

            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>

        </thead>

        <tbody>

            {tasks.map(task => (

                <tr key={task.id}>

                    <td>{task.id}</td>

                    <td>
                        <Link to={`/task/${task.id}`}>
                            {task.title}
                        </Link>
                    </td>

                    <td>{task.description}</td>

                    <td>{task.due_date}</td>

                    <td>
                        <span className={`priority-${task.priority.toLowerCase()}`}>
                            {task.priority}
                        </span>
                    </td>

                    <td>
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
                    </td>

                    <td>
                        <div className="actions">

                            <Link to={`/edit/${task.id}`}>
                                <button className="edit-btn">
                                    Edit
                                </button>
                            </Link>

                            <button
                                className="delete-btn"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>

                        </div>
                    </td>

                </tr>

            ))}

        </tbody>

    </table>

</div>

    </div>
  );
}

export default Dashboard;