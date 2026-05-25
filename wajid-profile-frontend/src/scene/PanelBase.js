import React from 'react';

export default function PanelBase({ angle, radius, label, children }) {
  return (
    <div
      className="panel-wrapper"
      style={{
        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
    >
      {/* Corner brackets */}
      <span className="pc tl" /><span className="pc tr" />
      <span className="pc bl" /><span className="pc br" />

      <div className="panel-topbar">
        <span className="panel-tag">{label}</span>
        <span className="panel-pulse" />
      </div>

      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}
