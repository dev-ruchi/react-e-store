import React, { useState } from "react";
import backend from "@/network/backend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };

    backend
      .post("/login", payload)
      .then((response) => {
        console.log(response);
        setData(response.data);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md"
        >
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
