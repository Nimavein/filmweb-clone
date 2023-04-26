import React, { useState } from "react";
import styles from "./ReadMoreText.module.scss";

interface ReadMoreTextProps {
  text: string;
  textClassName?: string;
  buttonClassName?: string;
  showTextLength: number;
  collapseText?: string;
  readMoreText?: string;
  displayButton?: boolean;
}

const ReadMoreText = ({
  text,
  textClassName = "",
  buttonClassName = "",
  showTextLength,
  collapseText = "Collapse",
  readMoreText = "Read more",
  displayButton = true,
}: ReadMoreTextProps) => {
  const isLongText = text.length > showTextLength;
  const [isReadMore, setIsReadMore] = useState<boolean>(false);

  const handleReadMoreClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsReadMore(!isReadMore);
  };

  return (
    <div className={styles["read-more"]}>
      <span className={`${textClassName} ${styles["read-more__text"]}`}>
        {text && (isReadMore || !isLongText) ? text : `${text?.substring(0, showTextLength)}...`}
      </span>
      {isLongText && displayButton && (
        <button
          className={`${buttonClassName} ${styles["read-more__button"]}`}
          onClick={(e) => handleReadMoreClick(e)}
          type="button"
        >
          <span className={styles["read-more__button-text"]}>
            {isReadMore ? collapseText : readMoreText}
          </span>
        </button>
      )}
    </div>
  );
};

export default ReadMoreText;
