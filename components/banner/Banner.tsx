import React, { useCallback, useEffect, useState } from "react";
import AppLogo from "./appLogo/AppLogo";
import CategoriesSelect from "../categoriesSelect/CategoriesSelect";
import ProfilePopover from "./profilePopover/ProfilePopover";
import SearchBar from "./searchBar/SearchBar";
import styles from "./Banner.module.css";
import { clearCookie, getCookie } from "../cookie";
import axios from "axios";
import { config } from "../../api/config";

function signOut() {
    return axios.delete("/api/auth", config);
}

const AppBanner = () => {

    const [name, setName] = useState<string | undefined>(undefined);

    useEffect(() => {
        const cookieData = getCookie();
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

            {name !== undefined || (
                <div className={styles.LoginLinkDiv}>
                    <a href="/login">Login</a>
                </div>
            )}

            {name === undefined || <ProfilePopover name={name} onSignOut={onSignOut} />}
        </div>
    );
};

export default AppBanner;
