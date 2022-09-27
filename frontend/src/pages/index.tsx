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

  const Login = (details: Details) => {
    console.log(details);

    if (details.email === admin.email && details.password == admin.password) {
      console.log("Success!");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Failed :(");
      setError("Invalid Login");
    }
  };
  const Logout = () => {
    console.log("Logged Out");
    setUser({
      name: "",
      email: "",
    });
  };
  return (
    <div className="Home">
      {user.email != "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.name}</span>
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
