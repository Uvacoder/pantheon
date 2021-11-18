import type { NextPage } from "next";
import React from "react";
import Banner from "../components/banner/Banner";
import Login from "../components/login/Login";
import AbsoluteCenter from "../components/util/center/AbsoluteCenter";

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
