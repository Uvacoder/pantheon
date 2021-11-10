import type { NextPage } from "next";
import React from "react";
import Banner from "../components/banner/Banner";
import AbsoluteCenter from "../components/layout/center/AbsoluteCenter";
import Login from "../components/login/Login";

const LoginPage: NextPage = () => {
    return (
        <>
            <Banner />
            <AbsoluteCenter>
                <Login />
            </AbsoluteCenter>
        </>
    );
};

export default LoginPage;
