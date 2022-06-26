import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <h1 className={styles.root}>
      <span>:(</span>
      <br />
      Nothing found
      <p>Unfortunately, this page is not available on our site.</p>
    </h1>
  );
};

export default NotFoundBlock;
