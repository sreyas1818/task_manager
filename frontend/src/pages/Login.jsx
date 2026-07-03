import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import API_URL from "../config";
function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(e) {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    }

    function login(e) {

        e.preventDefault();

        fetch(`${API_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(user)

        })
        .then(res => res.json())
        .then(data => {

            if (data.result === "success") {

                localStorage.setItem(
                    "token",
                    data.access_token
                );

                navigate("/");

            }
            else {

                alert("Invalid Username or Password");

            }

        });

    }

    return (

        <div className="container">

            <div className="form-card">

                <h1>Login</h1>

                <form onSubmit={login}>

                    <label>Username</label>

                    <input
                        name="username"
                        onChange={handleChange}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />

                    <button className="save-btn">

                        Login

                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;