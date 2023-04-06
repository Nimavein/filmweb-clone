import React from "react";
import styles from "./ReadMoreText.module.scss";

interface ReadMoreTextProps {
  text: string;
  isReadMore: boolean;
  setIsReadMore: React.Dispatch<React.SetStateAction<boolean>>;
  textClassName?: string;
  buttonClassName?: string;
  showTextLength: number;
  collapseText?: string;
  readMoreText?: string;
}

const ReadMoreText = ({
  text,
  isReadMore,
  setIsReadMore,
  textClassName = "",
  buttonClassName = "",
  showTextLength,
  collapseText = "Collapse",
  readMoreText = "Read more",
}: ReadMoreTextProps) => {
  const isLongText = text.length > showTextLength;
  const handleReadMoreClick = () => setIsReadMore(!isReadMore);

  return (
    <p className={`${textClassName} ${styles["read-more-text"]}`}>
      {text && (isReadMore || !isLongText)
        ? text
        : `${text?.substring(0, showTextLength)}...`}
      {isLongText && (
        <button
          className={`${buttonClassName} ${styles["read-more-text__button"]}`}
          onClick={handleReadMoreClick}
          type="button"
        >
          <span className={styles["read-more-text__button-text"]}>
            {isReadMore ? collapseText : readMoreText}
          </span>
        </button>
      )}
    </p>
  );
};

export default ReadMoreText;
