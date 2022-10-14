import type { NextPage } from "next";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
const Home: NextPage = () => {
  interface Details {
    name: string;
    email: string;
    password: string;
  }
  const admin = {
    email: "dhiraj2@illinois.edu",
    password: "cs222-group85",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState(""); // invalid login handler

  let Login = async (details: Details) => {

    let response = await fetch("http://127.0.0.1:5000", {method: "POST", body: JSON.stringify({
      name: details.name, 
      email: details.email, 
      password: details.password
    }),});
    let resJson = await response.json();
    if (resJson.status === 201) {
      postMessage("Login Successful");
    } else {
      setError("Invalid Login");
    }
  };
  const Logout = () => {
    setUser({
      name: "",
      email: "",
    });
    setError("");
  };
  return (
    <div className="Home">
      {user.email != "" ? (
        <div className="welcome">
          <h2 aria-label="Welcome">
            Welcome {user.name}
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
};

export default Home;
