"use client";

import React, { useState, ReactNode } from "react";
import Button from "../Button/Button";
import useSearchParam from "@/hooks/useSearchParam";

import styles from "./Tabs.module.scss";

interface Tab {
  key: string;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  paramKey: string;
  defaultActiveKey?: string;
  onTabClick?: (key?: string) => void;
  items: Tab[];
}

const Tabs = ({ defaultActiveKey, onTabClick, items, paramKey }: TabsProps) => {
  const { getSearchParam, setSearchParam } = useSearchParam();
  const [activeKey, setActiveKey] = useState<string>(
    getSearchParam(paramKey) || defaultActiveKey || ""
  );

  const handleTabClick = (key: string) => {
    if (key !== activeKey) {
      setActiveKey(key);
      onTabClick?.(key);
      setSearchParam(paramKey, key);
    }
  };

  return (
    <div className={styles["tabs"]}>
      <ul role="tablist" className={styles["tabs__tablist"]}>
        {items.map((tab) => (
          <li key={tab.key} className={styles["tabs__tablist-item"]}>
            <Button
              role="tab"
              onClick={() => handleTabClick(tab.key)}
              active={activeKey === tab.key}
              disabled={tab.disabled}
              tabIndex={tab.disabled ? -1 : 0}
              aria-selected={activeKey === tab.key}
            >
              {tab.label}
            </Button>
          </li>
        ))}
      </ul>
      <div className={styles["tabs__tabpanel"]} role="tabpanel">
        {items.find((tab) => tab.key === activeKey)?.children}
      </div>
    </div>
  );
};

export default Tabs;
