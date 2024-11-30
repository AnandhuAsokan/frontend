import React ,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"


function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) =>{
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:8000/api/", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch(error) {
        console.log('no response from server');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group row">
            <label htmlFor="emailId" className="col-form-label col-sm-3">
              Email Id
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="emailId"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="password" className="col-form-label col-sm-3">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group text-center">
            <button type="submit" className="btn btn-outline" id="button">
              Login
            </button>
            <div id="forgot-text">
              <p id="text">
                Don't have an account?{" "}
                <Link to="/signup" className="password">
                  SignUp here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login