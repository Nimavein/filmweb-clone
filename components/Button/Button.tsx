import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size?: "small" | "regular" | "large";
  active?: boolean;
  uppercase?: boolean;
  children: ReactNode;
}

const Button = ({
  type = "button",
  size = "regular",
  uppercase = false,
  active = false,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${styles["button"]}${size ? ` ${styles[`button--${size}`]}` : ""}${
        uppercase ? ` ${styles["button--uppercase"]}` : ""
      }${active ? ` ${styles["button--active"]}` : ""}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
