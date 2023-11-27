"use client";

import useSearchParam from "@/hooks/useSearchParam";
import { Row, Col, Slider, InputNumber } from "antd";

interface IntegerStepProps {
  value: number;
  paramName: string;
  maxValue: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const IntegerStep = ({
  value,
  paramName,
  maxValue,
  setValue
}: IntegerStepProps) => {
  const { setSearchParam } = useSearchParam();

  const onChange = (newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
      setSearchParam(paramName, newValue.toString());
    }
  };

  return (
    <Row>
      <Col span={16}>
        <Slider
          min={1}
          max={maxValue}
          onChange={onChange}
          value={typeof value === "number" ? value : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={maxValue}
          style={{ margin: "0 16px" }}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default IntegerStep;
