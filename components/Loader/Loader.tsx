import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const LoaderIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = () => <Spin indicator={LoaderIcon} />;

export default Loader;
