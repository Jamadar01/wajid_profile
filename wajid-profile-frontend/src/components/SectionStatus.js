import React from 'react';

/**
 * Shared loading / error indicator for backend-driven sections.
 * Renders nothing once data has arrived.
 */
export default function SectionStatus({ loading, error, empty }) {
  if (loading) {
    return (
      <div className="section-status">
        <span className="uplink-dot" />
        Establishing uplink…
      </div>
    );
  }
  if (error && empty) {
    return (
      <div className="section-status err">
        ⚠ Signal lost — the server may be waking up. Refresh in a few seconds.
      </div>
    );
  }
  return null;
}
