import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Banner from "../../components/banner/Banner";
import Feed from "../../components/feed/Feed";
import FullPost from "../../components/post/fullPostPanel/FullPostPanel";
import PostPanel from "../../components/post/postPanel/PostPanel";
import Body from "../../components/util/body/Body";
import { Post } from "../../database/entities/post";
import PostService from "../../database/services/post";

interface Props {
    serializedPost: string;
}

const PostPage: NextPage<Props> = ({ serializedPost }: Props) => (
    <>
        <Banner />
        <Body>
            <div
                style={{
                    margin: "0 auto",
                    paddingTop: 40,
                    width: "50%"
                }}
            >
                <FullPost post={JSON.parse(serializedPost)}/>
            </div>
        </Body>
    </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const id = query.id as string | undefined;

    if (!id) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    const post = await PostService.findById(id);

    if (!post) {
        return {
            redirect: {
                destination: "/404"
            },
            props: {}
        };
    }

    return {
        props: {
            serializedPost: JSON.stringify(post)
        }
    };
}

export default PostPage;