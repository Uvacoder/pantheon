import React from "react";
import styles from "./SortOption.module.css";

interface Props {
    text: string;
    selected: boolean;
}

const UserPanel = ({ text, selected }: Props) => (
    <div
        className={styles.SortOption}
        style={{
            backgroundColor: selected ? "rgb(67,67,67)" : undefined
        }}
    >
        {text}
    </div>
);

export default UserPanel;
