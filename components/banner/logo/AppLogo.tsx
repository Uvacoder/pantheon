import { Title } from "@mantine/core";
import React from "react";
import { ORANGE } from "../../colors";
import styles from "./AppLogo.module.css";

const AppLogo = () => (
    <Title
        className={styles.Title}
        order={3}
        style={{
            backgroundColor: ORANGE
        }}
    >
        <a className={styles.a} href="/">
            Pantheon
        </a>
    </Title>
);

export default AppLogo;
