import { ReactElement } from "react";
import styles from "./Body.module.css";

interface Props {
    children: ReactElement | ReactElement[];
    width: number | string;
    minWidth: number | string;
}

const Body = ({ children, width, minWidth }: Props) => {
    return (
        <div 
            className={styles.Body}
            style={{
                minWidth,
                width
            }}
        >
            { children }
        </div>
    );
}

export default Body;