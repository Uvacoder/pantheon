import { Select } from "@mantine/core";
import React, { FunctionComponent } from "react";
import { categories } from "../../database/global";
import styles from "./CategoriesSelect.module.css";

const pairs: { value: string; label: string }[] = [];

for (const category of categories) {
    pairs.push({
        value: category,
        label: category
    });
}

interface Props {
    onChange?: (category: string) => void;
    placeholder?: string;
}

const CategoriesSelect: FunctionComponent<Props> = ({ onChange, placeholder }: Props) => (
    <Select 
        className={styles.CategoriesSelect} 
        placeholder={placeholder}
        defaultValue={placeholder ? undefined : "All"} 
        data={pairs} 
        onChange={onChange}
    />
);

CategoriesSelect.defaultProps = {
    onChange: () => {}
}

export default CategoriesSelect;
