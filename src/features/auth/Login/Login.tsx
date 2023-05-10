import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { Form, Password, Input, Button } from "../../../components";
import { ROUTES_PATHS } from "../../../routes";
import { ModalForm, PopUp } from "../../../components";
import { logIn } from "../../../api";
import { LogInUser, UserProps } from "types";
import { LogIn } from "../../../context";
import { errorInputs } from "../../../utils";

export const Login = () => {
  const { changeUser } = useContext(LogIn) as LogInUser;
  const location = useNavigate();

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const emailTest = useRef("");
  const passwordTest = useRef("");

  const [errorMsj, setErrorMsj] = useState<string | null>(null);

  const { status, mutate } = useMutation<UserProps[]>({
    mutationFn: () => logIn(emailTest.current, passwordTest.current),

    onSuccess: (data) => {
      const val = data[0];
      const id = val.id!.toString();
      localStorage.setItem("userId", id);
      changeUser(val);
      location(`${ROUTES_PATHS.users}`);
    },

    onError: (error) => {
      if (typeof error === "object" && error !== null) {
        setErrorMsj(error.toString());
      }
    },
  });

  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    emailTest.current = e.target.value;
  }

  function updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    passwordTest.current = value;
  }

  function logInUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrEmail(emailTest.current === "" ? `${errorInputs.emailErr}` : "");
    setErrPassword(
      passwordTest.current === "" ? `${errorInputs.passwordErr}` : ""
    );

    if (emailTest.current === "") return;
    if (passwordTest.current === "") return;
    if (emailTest.current === "" && passwordTest.current === "") return;

    mutate();
  }

  return (
    <>
      {status === "error" && (
        <PopUp type="fail">
          <p>{errorMsj}</p>
        </PopUp>
      )}

      <ModalForm>
        <Form dimension="custom-form" onSendFn={logInUser} title="Log in">
          <p className="exist_account">
            Don't have an account yet?{" "}
            <span>
              <Link to={`${ROUTES_PATHS.register}`}>Sign Up</Link>
            </span>
          </p>

          <Input
            // value={passwordTest.current}
            type="email"
            placeholder="Email"
            onChange={updateEmail}
            errorMsj={errEmail}
          />

          <Password
            // value={password}
            placeholder="Password"
            onChange={updatePassword}
            errorMsj={errPassword}
          />

          <Button type="primary" dimension="full">
            Log In
          </Button>
        </Form>
      </ModalForm>
    </>
  );
};
