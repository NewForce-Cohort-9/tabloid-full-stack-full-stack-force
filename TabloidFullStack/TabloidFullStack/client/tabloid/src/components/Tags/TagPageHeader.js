import React from "react";

export default function TagPageHeader({ title }) {
  return (
    <header className="masthead bg-primary text-white text-center p-2">
      <div className="container d-flex align-items-center flex-column">
        <div className="divider-custom divider-light">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-line"></div>
        </div>
        <h2 className="pre-wrap font-weight-light mb-0">{title}</h2>
      </div>
    </header>
  );
}
