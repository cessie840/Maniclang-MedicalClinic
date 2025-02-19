import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated, isAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate credentials
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      navigate("/");
      console.log(isAuthenticated);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="h-[100vh] grid place-content-center bg-gradient-to-r from-blue-200 to-white text-black">
      <div className="w-[52vw] rounded-lg bg-white shadow-2xl flex">
        <form
          className="w-[26vw] mx-10 my-10 flex flex-col justify-center gap-1"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-3xl text-blue-600">ADMIN LOGIN</h1>
          <h1 className="font-bold text-2xl tracking-tight">
            Welcome to Maniclang's Medical Clinic
          </h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username...."
              className="bg-gray-200 w-full mb-4 mt-5 px-5 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password...."
              className="bg-gray-200 w-full px-5 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-BorderBlue"
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="mt-2 w-full h-14 font-medium text-Blue text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-BorderBlue"
            >
              Login
            </button>
          </div>
        </form>
        <div>
        <img src="123.png" alt="" />
      </div>
      </div>
      
    </div>
  );
};

export default Login;
