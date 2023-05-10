import React, {useState, Link} from 'react';
import "./styles/login.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        //prevents page from reloading
        e.preventDefault();
    }

    return (
        <>
            <div class = "container">
                <div className = "form">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input">
                            <input type="text" name="uname" placeholder="username"
                                   value={username}
                                   required/>
                        </div>
                        <div className="input">
                            <input type="text" name="passwood" placeholder="password"
                                   value={password}
                                   required/>
                        </div>
                        <div className="submit">
                            <input type="submit" />
                        </div>
                    </form>
                    <p>Don't have an account?
                        Sign Up
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
