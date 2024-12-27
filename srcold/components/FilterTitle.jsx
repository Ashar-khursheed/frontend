import React from "react";
const FilterTitle = ({ classes, title }) => {
  return (
    <h2 className={`${classes} text-black-100 font-semibold text-lg`}>
      {title}
    </h2>
  );
};

export default React.memo(FilterTitle);