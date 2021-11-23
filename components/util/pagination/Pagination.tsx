import Link from "next/link";
import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { ORANGE } from "../../colors";
import styles from "./Pagination.module.css";

interface Props {
    page: number;
    total: number;
    url: string;
}

function buildURL(url: string, page: number) {
    if (url.includes("?")) {
        return url + "&p=" + page;
    } else {
        return url + "?p=" + page;
    }
}

const Pagination = ({ page, total, url }: Props) => {

    const pages: JSX.Element[] = [];
    for (let i = 1; i <= total; i++) {
        pages.push(
            <Link href={buildURL(url, i)} key={i}>
                <div 
                    className={styles.Page}
                    style={{
                        backgroundColor: page === i ? ORANGE : undefined
                    }}
                >
                    { i }
                </div>
            </Link>
        );
    }

    return (
        <div>
            {(page - 1 < 1) ||
                <Link href={buildURL(url, page - 1)}>
                    <div className={styles.Page}>
                        <ChevronLeft size={14}/>
                    </div>
                </Link>
            }
            { pages }
            {(page + 1 > total) ||
                <Link href={buildURL(url, page + 1)}>
                    <div className={styles.Page}>
                        <ChevronRight size={14}/>
                    </div>
                </Link>
            }
        </div>
    );
}

export default Pagination;