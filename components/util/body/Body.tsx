import { ReactElement } from "react";
import styles from "./Body.module.css";

interface Props {
    children: ReactElement | ReactElement[];
}

const Body = ({ children }: Props) => {
    return (
        <div className={styles.Body}>
            { children }
        </div>
    );
}

export default Body;