import { ChangeEvent, useState } from "react";

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

  return (
    <div>
      <h1>Sign up with your email and password</h1>

      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          type="text"
          required
          value={displayName}
          name="displayName"
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          name="email"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          name="password"
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
