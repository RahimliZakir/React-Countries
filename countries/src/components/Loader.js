import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

const Loader = () => {
  const darkThemeState = useSelector((state) => state.setDarkTheme);

  const darkTheme = classNames("loader-root", {
    "dark-mode": darkThemeState,
  });

  return (
    <div className={darkTheme}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
