import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "../cookie";
import styles from "./AppAvatar.module.css";

interface Props {
    width: number;
    height: number;
}

const Avatar = ({ width, height }: Props) => {

    const [userId, setUserId] = useState<string | undefined>(undefined);

    useEffect(() => {
        const cookieData = getCookie();
        setUserId(cookieData?.userId);
    });

    return (
        <Image 
            className={styles.Avatar} 
            src={"/api/images/avatar/" + userId} 
            width={width} 
            height={height}
        />
    );
}

export default Avatar;