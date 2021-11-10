import React, { useCallback, useEffect, useState } from "react";
import AppLogo from "./logo/AppLogo";
import CategoriesSelect from "./categoriesSelect/CategoriesSelect";
import ProfilePopover from "./profilePopover/ProfilePopover";
import SearchBar from "./searchBar/SearchBar";
import styles from "./Banner.module.css";
import { clearCookie, getCookie } from "../cookie";
import { signOut } from "../../api/client/auth";

const AppBanner = () => {
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);

    useEffect(() => {
        const cookieData = getCookie();
        setUserId(cookieData?.userId);
        setName(cookieData?.name);
    });

    const onSignOut = useCallback(() => {
        clearCookie();
        signOut().then(() => (document.location.href = "/"));
    }, []);

    return (
        <div className={styles.Banner}>
            <AppLogo />

            <CategoriesSelect />

            <SearchBar />

            {(userId !== undefined && name !== undefined) || (
                <div className={styles.LoginLinkDiv}>
                    <a href="/login">Login</a>
                </div>
            )}

            {userId === undefined || name === undefined || <ProfilePopover name={name} userId={userId} onSignOut={onSignOut} />}
        </div>
    );
};

export default AppBanner;
