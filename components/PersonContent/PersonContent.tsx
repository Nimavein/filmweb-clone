import React from "react";
import { useAppSelector } from "@/store";
import styles from "./PersonContent.module.scss";

const PersonContent = () => {
  const { details } = useAppSelector((state) => state.person);
  return <main className={styles["person-content"]}>{details?.name}</main>;
};

export default PersonContent;
