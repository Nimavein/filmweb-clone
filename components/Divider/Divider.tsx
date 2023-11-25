"use client";

import { Divider as AntdDivider, DividerProps } from "antd";

import React from "react";

const Divider = (props: DividerProps) => {
  return (
    <AntdDivider {...props} style={{ margin: "12px 0", background: "#d4d4d4", ...props.style }} />
  );
};

export default Divider;
