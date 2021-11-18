import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import Banner from "../components/banner/Banner";
import Feed from "../components/feed/Feed";
import Body from "../components/util/body/Body";
import { ALL_CATEGORY, SortType } from "../database/global";

interface Props {
    category?: string;
    sort: SortType;
}

const HomePage: NextPage<Props> = ({ category, sort }: Props) => {
    return (
        <>
            <Banner/>
            <Body>
                <Feed initialSort={sort} />
            </Body>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    let category = query.category as string | undefined;
    if (!category) {
        category = ALL_CATEGORY;
    }

    let sort = query.sort as string | undefined;
    if (!sort) {
        sort = "new";
    }

    return {
        props: {
            category: category,
            sort: sort
        }
    };
};

export default HomePage;
