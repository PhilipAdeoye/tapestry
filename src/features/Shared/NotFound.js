import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { showModal } from "../Modal/modalSlice";
import styles from "./HelpInfo.module.css";
import { SectionDivider } from "../../app/Misc/SectionDivider";

export const NotFound = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const view = (
      <div className={styles.container}>
        <p className={styles.greeting}>Oops!</p>

        <SectionDivider />

        <p className={styles.lead}>
          We couldn't find what you're looking for, so we are back home now
        </p>
      </div>
    );

    dispatch(showModal({ content: view }));
    history.push("/");
  }, [dispatch, history]);

  return null;
};
