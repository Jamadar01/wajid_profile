import React from "react";

export default function GlitchText({ children, as: Tag = "span", className = "" }) {
  return (
    <Tag className={`glitch-text ${className}`} data-text={children}>
      {children}
    </Tag>
  );
}
