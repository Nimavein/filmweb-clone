"use client";

import React, { useState, ReactNode } from "react";
import Button from "../Button/Button";

interface Tab {
  key: string;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  defaultActiveKey?: string;
  onTabClick?: (key?: string) => void;
  items: Tab[];
}

const Tabs = ({ defaultActiveKey, onTabClick, items }: TabsProps) => {
  const [activeKey, setActiveKey] = useState<string>(defaultActiveKey || "");

  const handleTabClick = (key: string) => {
    if (key !== activeKey) {
      setActiveKey(key);
      onTabClick?.(key);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        {items.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            active={activeKey === tab.key}
            disabled={tab.disabled}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div>{items.find((tab) => tab.key === activeKey)?.children}</div>
    </div>
  );
};

export default Tabs;
