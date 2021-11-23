import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import Banner from "../components/banner/Banner";
import Feed from "../components/feed/Feed";
import Body from "../components/util/body/Body";
import { categories, SortType, TimeType } from "../database/global";

interface Props {
    sort: SortType;
    time: TimeType;
    page: number;
}

const FeedPage: NextPage<Props> = ({ sort, time, page }: Props) => {
    return (
        <>
            <Banner/>
            <Body>
                <Feed 
                    sort={sort} 
                    time={time}
                    page={page}
                />
            </Body>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

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

    let sort = query.slug as string | undefined;
    if (!sort) {
        sort = "new";
    }

    let time = query.t as string | undefined;
    if (!time) {
        time = "day";
    }

    return {
        props: {
            sort,
            time,
            page
        }
    };
};

export default FeedPage;
