import { Card } from "@mantine/core";
import React, { FunctionComponent, useState } from "react";
import { SortType } from "../../database/global";
import SortOption from "./sortOption/SortOption";
import styles from "./SortOptions.module.css";

interface Props {
    onChangeSort?: (sort: SortType) => void;
    initial: SortType;
}

const SortOptions: FunctionComponent<Props> = (props: Props) => {

    const [selected, setSelected] = useState(props.initial);

    return (
        <Card className={styles.Sort}>
            <SortOption 
                text="New" 
                selected={selected === "new"} 
                onClick={() => setSelected("new")}
            />
            <SortOption 
                text="Top" 
                selected={selected === "top"} 
                onClick={() => setSelected("top")}
            />
        </Card>
    );
}

SortOptions.defaultProps = {
    onChangeSort: () => {}
}

export default SortOptions;