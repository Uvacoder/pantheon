import { Select } from "@mantine/core";
import React from "react";
import { categories } from "../../../database/global";
import styles from "./CategoriesSelect.module.css";

const pairs: { value: string; label: string }[] = [];
pairs.push({ value: "All", label: "All" });

for (const category of categories) {
    pairs.push({
        value: category,
        label: category
    });
}

const CategoriesSelect = () => <Select className={styles.CategoriesSelect} placeholder="Categories" defaultValue={"All"} data={pairs} />;

export default CategoriesSelect;
