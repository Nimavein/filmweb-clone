import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "regular" | "large";
  active?: boolean;
  uppercase?: boolean;
}

const Button = ({
  size = "regular",
  uppercase = false,
  active = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${styles["button"]}${
        size ? ` ${styles[`button--${size}`]}` : ""
      }${uppercase ? ` ${styles["button--uppercase"]}` : ""}${
        active ? ` ${styles["button--active"]}` : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
