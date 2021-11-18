import type { GetServerSideProps, NextPage } from "next";
import User, { UserData } from "../../components/user/User";
import Banner from "../../components/banner/Banner";
import React from "react";
import UserService from "../../database/services/user";
import Body from "../../components/util/body/Body";
import { SortType } from "../../database/global";

interface Props {
    userData: UserData;
    initialSort: SortType;
}

const UserPage: NextPage<Props> = ({ userData, initialSort }: Props) => (
    <>
        <Banner />
        <Body>
            <User 
                userData={userData}
                initialSort={initialSort}
            />
        </Body>
    </>
);


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const name = query.slug as string;

    let sort = query.sort as string;
    if (!sort) {
        sort = "new";
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
            },
            initialSort: sort
        }
    };
};

export default UserPage;
