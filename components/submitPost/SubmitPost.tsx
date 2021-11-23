import { Card, Divider, Space, Tab, Tabs, Title } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { config } from "../../api/config";
import { IdRes } from "../../api/interfaces/common";
import { CreateBody } from "../../api/interfaces/post";
import CategoriesSelect from "../categoriesSelect/CategoriesSelect";
import styles from "./SubmitPost.module.css";
import SubmitText from "./submitText/SubmitText";

export function submitPost(body: CreateBody) {
    return axios.post<IdRes>("/api/posts", body, config);
}

const SubmitPost = () => {

    return (
        <div className={styles.SubmitPost}>
           <Title order={3} className={styles.SubmitTitle}>
                Create Post
            </Title>
            <Divider style={{ marginTop: 12, marginBottom: 18 }} />
            <Card className={styles.SubmitPanel}>
                <Space h="md"/>
                <Tabs className={styles.Tabs}>
                    <Tab label="Text" className={styles.Tab}>
                        <SubmitText/>
                    </Tab>
                    <Tab label="Link" className={styles.Tab}></Tab>
                    <Tab label="Image" className={styles.Tab}></Tab>
                    <Tab label="Poll" className={styles.Tab}></Tab>
                </Tabs>
            </Card>
            <Space h={300}/>
        </div>
    );
}

export default SubmitPost;