import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer } from "./sign-up-form.styles";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async () => {
    setIsLoading(true);
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
  
      try {
        const { user } = await createAuthUserWithEmailAndPassword(
          email,
          password
        );
  
        await createUserDocumentFromAuth(user, { displayName });
        
        resetFormFields();
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Cannot create user, email already in use");
        }
        console.log("user creation error: ", error);
      }
      setIsLoading(false);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    submitForm();
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Display Name"
          htmlOptions={{
            type: "text",
            name: "displayName",
            value: displayName,
            required: "true",
            onChange: handleFormInputChange,
          }}
        />
        <FormInput
          label="Email"
          htmlOptions={{
            type: "email",
            name: "email",
            value: email,
            required: "true",
            onChange: handleFormInputChange,
          }}
        />
        <FormInput
          label="Password"
          htmlOptions={{
            type: "password",
            name: "password",
            value: password,
            required: "true",
            onChange: handleFormInputChange,
          }}
        />
        <FormInput
          label="Confirm Password"
          htmlOptions={{
            type: "password",
            name: "confirmPassword",
            value: confirmPassword,
            required: "true",
            onChange: handleFormInputChange,
          }}
        />
        <Button type="submit" disabled={isLoading}>{isLoading ? "Signing Up..." : "Sign Up"}</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
