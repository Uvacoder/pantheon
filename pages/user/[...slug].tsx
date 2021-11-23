import type { GetServerSideProps, NextPage } from "next";
import User, { UserData } from "../../components/user/User";
import Banner from "../../components/banner/Banner";
import React from "react";
import UserService from "../../database/services/user";
import Body from "../../components/util/body/Body";
import { SortType, TimeType } from "../../database/global";

interface Props {
    userData: UserData;
    sort: SortType;
    time: TimeType;
    page: number;
}

const UserPage: NextPage<Props> = ({ userData, sort, time, page }: Props) => (
    <>
        <Banner />
        <Body>
            <User 
                userData={userData}
                sort={sort}
                time={time}
                page={page}
            />
        </Body>
    </>
);


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const slugs = query.slug as string[];

    const pageStr = query.p as string | undefined;
    let page = Number(pageStr);
    if (!page) {
        page = 1;
    }
    if (isNaN(page) || page <= 0) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    let sort = slugs[1];
    if (!sort) {
        sort = "new";
    }

    let time = query.t as string | undefined;
    if (!time) {
        time = "day";
    }

    const name = slugs[0];
    if (!name) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
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
            sort,
            time,
            page
        }
    };
};

export default UserPage;
