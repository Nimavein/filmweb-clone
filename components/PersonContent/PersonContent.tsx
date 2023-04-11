import React from "react";
import { useAppSelector } from "@/store";
import styles from "./PersonContent.module.scss";
import PersonContentDetails from "./PersonContentDetails/PersonContentDetails";

const PersonContent = () => {
  const { details } = useAppSelector((state) => state.person);
  return <main className={styles["person-content"]}>
    <PersonContentDetails />
  </main>;
};

export default PersonContent;
