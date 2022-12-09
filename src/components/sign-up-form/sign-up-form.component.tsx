import { ChangeEvent, FormEvent, useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { confirmPassword, displayName, email, password } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const form = {
      ...formFields,
      [name]: value,
    };

    setFormFields(form);
  };

  const resetFormfield = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const passwordsNotEquals = password !== confirmPassword;

    if (passwordsNotEquals) {
      alert("password do not match");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(response, displayName);

      resetFormfield();
    } catch (error: any) {
      const errorEmailinUse = error.code === "auth/email-already-in-use";

      if (errorEmailinUse) {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encoutered an error", error.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Display Name"
          value={displayName}
          name="displayName"
          handleChange={handleChange}
        />

        <FormInput
          type="email"
          label="Email"
          value={email}
          name="email"
          handleChange={handleChange}
        />

        <FormInput
          type="password"
          label="Password"
          value={password}
          name="password"
          handleChange={handleChange}
        />

        <FormInput
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          handleChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
