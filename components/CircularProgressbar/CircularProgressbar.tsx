import React from "react";

interface CircularProgressbarProps {
  strokeWidth: number;
  background: boolean;
  maxValue: number;
  value: number;
  height?: number;
  width?: number;
}

const CircularProgressbar = ({
  strokeWidth,
  background,
  maxValue,
  value,
  height = 20,
  width = 20,
}: CircularProgressbarProps) => {
  const radius = 50;
  const normalizedValue = Math.min(Math.max(value, 0), maxValue);
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedValue / maxValue) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg height={height} width={width} className="circular-progress">
      {background && (
        <circle
          className="background-circle"
          cx="50"
          cy="50"
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
      )}
      <circle
        className="progress-circle"
        cx="50"
        cy="50"
        r={radius - strokeWidth / 2}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset: offset }}
        fill="transparent"
      />
      <text x="50%" y="50%" className="progress-text" dominantBaseline="middle" textAnchor="middle">
        {normalizedValue}
      </text>
    </svg>
  );
};

export default CircularProgressbar;
