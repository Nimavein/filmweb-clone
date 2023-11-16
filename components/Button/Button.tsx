import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  size?: "small" | "regular" | "large";
  active?: boolean;
  uppercase?: boolean;
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

const Button = ({
  type = "button",
  size = "regular",
  uppercase = false,
  active = false,
  children,
  onClick,
  ariaLabel,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${styles["button"]}${
        size ? ` ${styles[`button--${size}`]}` : ""
      }${uppercase ? ` ${styles["button--uppercase"]}` : ""}${
        active ? ` ${styles["button--active"]}` : ""
      }`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
