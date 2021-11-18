import type { NextPage } from "next";
import React from "react";
import Banner from "../components/banner/Banner";
import SubmitPost from "../components/submitPost/SubmitPost";
import Body from "../components/util/body/Body";

const SubmitPage: NextPage = () => {
    return (
        <>
            <Banner />
            <Body>
                <SubmitPost/>
            </Body>
        </>
    );
};

export default SubmitPage;
