import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#ededed"
      foregroundColor="#c1bebe"
    >
      <rect x="0" y="290" rx="5" ry="5" width="280" height="30" />
      <circle cx="139" cy="139" r="139" />
      <rect x="0" y="340" rx="5" ry="5" width="280" height="70" />
      <rect x="0" y="430" rx="5" ry="5" width="82" height="30" />
      <rect x="165" y="427" rx="23" ry="23" width="117" height="35" />
    </ContentLoader>
  );
};

export default Skeleton;
