// Spinner.jsx
import React from "react";

const Spinner = ({ size = "w-10 h-10", color = "4E2327" }) => {
  return (
    <div
      className={`border-4 border-t-4 border-t-transparent rounded-full animate-spin ${size} ${color}`}
    ></div>
  );
};

export default Spinner;
