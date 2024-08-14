import React, { useState } from "react";
import backend from "@/network/backend";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      password: password,
    };

    backend
      .post("/users", payload)
      .then((response) => {
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("token", response.data.token);

        setUserId(response.data.id);
        setFirstName("");
        setLastName("");
        setPhone("");
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
              Firstname:
            </label>
            <input
              className="input input-primary w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-800 text-lg font-semibold mb-2"
            >
              Lastname:
            </label>
            <input
              className="input input-primary w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-gray-800 text-lg font-semibold mb-2"
            >
              Phone:
            </label>
            <input
              className="input input-primary w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
