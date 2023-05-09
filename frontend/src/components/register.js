import React, {useState} from 'react';
import "./login.css";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <>
            <div class = "container">
                <div className = "form">
                    <h1>Sign Up</h1>
                    <form>
                        <div className="input">
                            <label htmlFor="Name">Name</label>
                            <input type="text" name="name" placeholder="name"
                                   value={name}
                                   required/>
                        </div>
                        <div className="input">
                            <label htmlFor="Username">Username</label>
                            <input type="text" name="uname" placeholder="username"
                                   value={username}
                                   required/>
                        </div>
                        <div className="input">
                            <label htmlFor="Username">Password</label>
                            <input type="text" name="passwood" placeholder="password"
                                   value={password}
                                   required/>
                        </div>
                        <div className="submit">
                            <input type="submit" />
                        </div>
                    </form>
                    <p>Sign Up</p>
                </div>
            </div>
        </>
    );
}

export default Register;
