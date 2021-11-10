import { Button } from "@mantine/core";
import React from "react";
import { ORANGE } from "../../colors";
import styles from "./FormButton.module.css";

interface Props {
    text: string;
    loading: boolean;
}

const FormButton = ({ text, loading }: Props) => (
    <Button
        className={styles.FormButton}
        style={{
            backgroundColor: ORANGE
        }}
        type="submit"
        loading={loading}
    >
        {text}
    </Button>
);

export default FormButton;
