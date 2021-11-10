import React, { FunctionComponent, ReactElement } from "react";
import styles from "./AppLink.module.css";

interface Props {
    icon: ReactElement;
    text: string;
    href?: string;
    onClick?: () => void;
}

const AppLink: FunctionComponent<Props> = ({ icon, text, href, onClick }: Props) => (
    <a className={styles.AppLink} href={href} onClick={onClick}>
        <span>{icon}</span>
        <span className={styles.Element}>{text}</span>
    </a>
);

AppLink.defaultProps = {
    onClick: () => {
    }
};

export default AppLink;
