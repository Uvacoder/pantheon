import React, { FunctionComponent } from "react";
import styles from "./SortOption.module.css";

interface Props {
    text: string;
    selected: boolean;
    onClick?: () => void;
}

const SortOption: FunctionComponent<Props> = ({ text, selected, onClick }: Props) => (
    <div
        className={styles.SortOption}
        style={{
            backgroundColor: selected ? "rgb(67,67,67)" : undefined
        }}
        onClick={onClick}
    >
        { text }
    </div>
);

SortOption.defaultProps = {
    onClick: () => {}
}

export default SortOption;
