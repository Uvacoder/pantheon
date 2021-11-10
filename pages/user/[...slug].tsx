import type { GetServerSideProps, NextPage } from "next";
import User, { UserData } from "../../components/user/User";

import Banner from "../../components/banner/Banner";
import React from "react";
import UserPosts from "../../components/user/userPosts/UserPosts";
import UserService from "../../database/services/user";

interface Props {
    userData: UserData;
}

const UserPage: NextPage<Props> = ({ userData }: Props) => (
    <>
        <Banner />
        <div
            style={{
                position: "fixed",
                paddingTop: 50
            }}
        >
            <User userData={userData}>
                <UserPosts />
            </User>
        </div>
    </>
);


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const [name, page] = query.slug as string[];

    let pageNum = parseInt(page);
    if (isNaN(pageNum)) {
        pageNum = 1;
    }

    const user = await UserService.findUserByName(name);

    if (!user) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    return {
        props: {
            userData: {
                name: user.name,
                userId: user.id,
                description: user.description,
                joined: user.createdAt.toLocaleDateString()
            }
        }
    };
};

export default UserPage;
