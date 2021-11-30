import React from "react";
import { PUBLIC_CLOUD_URL } from "../../../../../model/global";
import PhotoGallery from "../../../../Util/Widget/PhotoGallery/PhotoGallery";
import styles from "./TextContent.module.css";

interface Props {
    images: string[];
}

const ImageContent = ({ images }: Props) => (
    <div className={styles.GalleryContainer}>
        <PhotoGallery 
            imgIds={images}
            baseUrl={`${PUBLIC_CLOUD_URL}/assets`}
            width={"100%"}
            height={500}
        />
    </div>
);

export default ImageContent;