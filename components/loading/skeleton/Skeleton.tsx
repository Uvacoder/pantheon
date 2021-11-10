import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader speed={2} width={400} height={160} viewBox="0 0 400 160" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
        <rect x="52" y="16" rx="3" ry="3" width="97" height="11" />
        <rect x="5" y="52" rx="3" ry="3" width="574" height="87" />
        <circle cx="20" cy="20" r="20" />
    </ContentLoader>
);

export default Skeleton;
