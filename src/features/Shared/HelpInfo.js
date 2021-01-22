import React from "react";
import { SectionDivider } from "../../app/Misc/SectionDivider";
import styles from "./HelpInfo.module.css";

export const HelpInfo = () => {
  return (
    <div className={styles.container}>
      <p className={styles.greeting}>Need Help?</p>

      <SectionDivider />

      <p className={styles.lead}>Your HILI coach is always here for you</p>
      <div className={styles.contact_container}>
        <p className={styles.contact_number}>(800) GET-HELP</p>
      </div>
    </div>
  );
};
