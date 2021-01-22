import React from "react";
import { useDispatch } from "react-redux";
import { ProgressBar } from "../../app/Misc/ProgressBar";
import { SectionDivider } from "../../app/Misc/SectionDivider";
import { showModal } from "../Modal/modalSlice";
import styles from "./PointsCategoryItem.module.css";

export const PointsCategoryItem = ({
  image,
  description,
  imgAlt,
  name,
  currentVal,
  max,
}) => {
  const dispatch = useDispatch();
  const onButtonClick = () => {
    dispatch(
      showModal({
        content: (
          <CategoryInfo
            title={name}
            description={description}
            currentVal={currentVal}
            max={max}
          />
        ),
      })
    );
  };
  return (
    <button type="button" className={styles.button} onClick={onButtonClick}>
      <img className={styles.image} src={image} alt={imgAlt} />
      <div className={styles.content}>
        <p className={styles.name}>{name}</p>
        <ProgressBar
          currentValue={currentVal}
          maxValue={max}
          useBoldText={false}
        />
      </div>
    </button>
  );
};

const CategoryInfo = ({ title, description, currentVal, max }) => {
  return (
    <div className={styles.info_container}>
      <p className={styles.title}>{title}</p>
      <SectionDivider />
      <p className={styles.description}>{description}</p>

      <ProgressBar currentValue={currentVal} maxValue={max} />
    </div>
  );
};
