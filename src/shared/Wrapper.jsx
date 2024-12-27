import React from "react";

export const Wrapper = ({ children, classes }) => {
  return <div className={`${classes} mx-auto container`}>{children}</div>;
};
