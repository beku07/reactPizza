import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        // {...props}
    >
        <circle cx="126" cy="123" r="103" />
        <rect x="119" y="253" rx="0" ry="0" width="16" height="1" />
        <rect x="2" y="278" rx="15" ry="15" width="251" height="100" />
        <rect x="1" y="243" rx="15" ry="15" width="251" height="22" />
        <rect x="4" y="395" rx="10" ry="10" width="81" height="37" />
        <rect x="128" y="395" rx="20" ry="20" width="121" height="44" />
    </ContentLoader>
);

export default Skeleton;