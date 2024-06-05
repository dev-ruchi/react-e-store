import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userId, setUserId] = useState(
    parseInt(localStorage.getItem("userId"))
  );

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8080/users", payload)
      .then((response) => {
        console.log(response);
        localStorage.setItem("userId", response.data.id);
        setUserId(response.data.id);
        console.log(response.data.id);
        setUsername("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-800 text-lg font-semibold mb-2"
            >
              Username:
            </label>
            <input
              className="input input-primary w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-800 text-lg font-semibold mb-2"
            >
              Email:
            </label>
            <input
              className="input input-primary w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-gray-800 text-lg font-semibold mb-2"
            >
              Password:
            </label>
            <input
              className="input input-primary w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex items-center justify-center">
            <button className="btn btn-primary w-full" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
