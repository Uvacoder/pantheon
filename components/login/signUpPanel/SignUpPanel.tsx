import { InputWrapper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import request from "axios";
import React, { useCallback, useState } from "react";
import { login } from "../../../api/client/auth";
import { create } from "../../../api/client/user";
import { findValidationMessage, ValidationErrorRes } from "../../../api/interfaces/common";
import { setCookie } from "../../cookie";
import FormButton from "../../input/formButton/FormButton";
import styles from "./SignUpPanel.module.css";

const SignUpPanel = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const submit = useCallback(
        (e) => {
            e.preventDefault();

            setLoading(true);
            create({
                email: email,
                name: name,
                password: password,
                verifyPassword: password
            })
                .then(() => {
                    login({
                        email: email,
                        password: password
                    })
                        .then((res) => {
                            setCookie(res.data);
                            document.location.href = "/";
                        })
                        .catch((err) => {
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    if (request.isAxiosError(err) && err.response) {
                        const errData = err.response.data as ValidationErrorRes;
                        setEmailError(findValidationMessage(errData, "email"));
                        setNameError(findValidationMessage(errData, "name"));
                        setPasswordError(findValidationMessage(errData, "password"));
                    }
                    setLoading(false);
                });
        },
        [email, name, password]
    );

    return (
        <div className={styles.SignUpPanel}>
            <Title className={styles.Title} order={2}>
                Sign Up
            </Title>
            <Text className={styles.Text}>Don't have an account? Signing up is free!</Text>
            <form onSubmit={submit}>
                <InputWrapper className={styles.InputWrapper} required label="Email Address">
                    <TextInput
                        placeholder="Email"
                        value={email}
                        error={emailError}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        autoComplete="email"
                    />
                </InputWrapper>
                <InputWrapper className={styles.InputWrapper} required label="User Name">
                    <TextInput
                        placeholder="Username"
                        value={name}
                        error={nameError}
                        onChange={(event) => setName(event.currentTarget.value)}
                        autoComplete="username"
                    />
                </InputWrapper>
                <InputWrapper className={styles.InputWrapper} required label="Password">
                    <PasswordInput
                        placeholder="Password"
                        value={password}
                        error={passwordError}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                        autoComplete="new-password"
                    />
                </InputWrapper>
                <FormButton text="Create Account" loading={loading} />
            </form>
        </div>
    );
};

export default SignUpPanel;
