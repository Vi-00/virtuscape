import React, {useState} from 'react';
import "./styles/login.css";

function Login() {
    const [form, setForm] = useState("login");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        //prevents page from reloading
        e.preventDefault();
    }

    const changeForm = () => {
      setForm(form === "login" ? "signup" : "login");
    }

    if (form === "login") {
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
                              <input type="submit" value = "Login"/>
                          </div>
                      </form>
                      <p>
                        Don't have an account?
                        <button onClick={changeForm}>Sign Up</button>
                      </p>
                  </div>
              </div>
          </>
      );
    }
    if (form === "signup") {
      return (
          <>
              <div class = "container">
                  <div className = "form">
                      <h1>Sign Up</h1>
                      <form>
                          <div className="input">
                              <input type="text" name="name" placeholder="name"
                                     value={name}
                                     required/>
                          </div>
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
                              <input type="submit" value = "Sign Up"/>
                          </div>
                      </form>
                      <p>
                          Already have an account?
                          <button onClick={changeForm}>Login</button>
                      </p>
                  </div>
              </div>
          </>
      );
    }
}

export default Login;
