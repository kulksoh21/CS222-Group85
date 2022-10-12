import React, { useState } from "react";
import Image from "next/image";
import logo from "./cs_222_logo.jpeg";
//Inspired by https://www.youtube.com/watch?v=7uKVFD_VMT8

interface Details {
  name: string;
  email: string;
  password: string;
}
interface IProps {
  Create: (arg0: Details) => void;
  error: string;
}
function CreateForm({ Create, error }: IProps) {
  const [details, setDetails] = useState<Details>({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Create(details);
  };
  return (
  <div className="body">
    <div className="container2">
    <form className="form" role="form" id="create_account" onSubmit={(e) => submitHandler(e)}></form>
    <h1 className="form__title">Create Account</h1>
        {error != "" ? <div className="form__message--error">{error}</div> : ""}

        {/* username input area when creating account */}

        <div className="form__input-group">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            name="name"
            aria-label="name"
            id="name"
            // autofocus="username"
            className="form__input"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.name}
          />
        </div>

        {/* email input area when creating account */}

        <div className="form__input-group">
          <label htmlFor="name">Email:</label>
          <input
            type="text"
            name="name"
            aria-label="name"
            id="name"
            // autofocus="email address"
            className="form__input"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.email}
          />
        </div>

        {/* confirm email input area when creating account */}

        <div className="form__input-group">
          <label htmlFor="name">Confirm Email:</label>
          <input
            type="text"
            name="name"
            aria-label="name"
            id="name"
            // autofocus="email address"
            className="form__input"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.email}
          />
        </div>

        {/* password input area when creating account */}

        <div className="form__input-group">
          <label htmlFor="name">Password:</label>
          <input
            type="text"
            name="name"
            aria-label="name"
            id="name"
            // autofocus="email address"
            className="form__input"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.password}
          />
        </div>

        {/* confirm password input area when creating account */}

        <div className="form__input-group">
          <label htmlFor="name">Confirm Password:</label>
          <input
            type="text"
            name="name"
            aria-label="name"
            id="name"
            // autofocus="email address"
            className="form__input"
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            value={details.password}
          />

          <input aria-label="button" className="form__button" type="submit" value="Create Account" />
        </div>

        </div>


    </div>
  );
}

export default CreateForm;
