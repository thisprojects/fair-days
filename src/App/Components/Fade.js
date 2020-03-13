import React from "react";

const Fade = ({ duration = "0.1s", showComponent, children }) =>
  showComponent && (
    <div className="fade-in" style={{ animationDuration: `${ duration }` }}>
      { children }
    </div>
  );

export default Fade;
