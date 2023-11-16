import React from "react";
import styles from "./Profile.module.scss";
import ProfileTabs from "./components/ProfileTabs/ProfileTabs";

const Profile = () => {
  return (
    <main className={styles["profile"]}>
      <ProfileTabs />
    </main>
  );
};

export default Profile;
