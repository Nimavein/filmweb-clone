import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size?: "small" | "regular" | "large";
  uppercase?: boolean;
  children: ReactNode;
}

const Button = ({
  type = "button",
  size = "regular",
  uppercase = false,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${styles["button"]}${
        size ? ` ${styles[`button--${size}`]}` : ""
      }${uppercase ? ` ${styles["button--uppercase"]}` : ""}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
