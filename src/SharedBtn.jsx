import React from "react";

export default function SharedBtn({ action, children }) {
  return (
    <button
      onClick={action}
      className="shared-btn rounded-3 border-0 text-white fs-6 py-3 px-3">
      {children}
    </button>
  );
}
