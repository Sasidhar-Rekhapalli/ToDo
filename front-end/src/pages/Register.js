import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3001/`,
});

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    try {
      api
        .post("/register", {
          username: username,
          password: password,
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    } catch (error) {}
    /*
    fetch(`http://localhost:3001/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.json());
        }
        return response;
      })
      .catch(() => {
        setIsError(true);
      }); */
  };

  return (
    <>
      <h1>Register</h1>
      {!!error && error}
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            placeholder="username"
            onChange={(input) => setUsername(input.target.value)}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            placeholder="password"
            onChange={(input) => setPassword(input.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
