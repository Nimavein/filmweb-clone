import React from "react";
import "./Divider.module.scss";

interface DividerProps {
  style: React.CSSProperties;
}

const Divider = ({ style }: DividerProps) => {
  return <div style={style} className="divider"></div>;
};

export default Divider;
