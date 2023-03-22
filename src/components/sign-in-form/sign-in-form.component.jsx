import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const submitForm = async () => {
    setIsLoading(true);
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
        );      
        resetFormFields();
      } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/user-not-found":
          alert(`No user associated with email ${email}`);
          break;
          default:
            console.log(error);
          }
    }
    setIsLoading(false);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    submitForm();
  };
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleFormSubmit}>
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
        <div className="buttons-container">
        <Button type="submit" disabled={isLoading}>{isLoading ? "Signing In..." : "Sign In"}</Button>
        <Button type="button" disabled={isLoading} buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
