import { Center } from "@mantine/core";
import React, { ReactElement } from "react";
import styles from "./AbsoluteCenter.module.css";

interface Props {
    children: ReactElement[] | ReactElement;
}

const AbsoluteCenter = ({ children }: Props) => <Center className={styles.AbsoluteCenter}>{children}</Center>;

export default AbsoluteCenter;
