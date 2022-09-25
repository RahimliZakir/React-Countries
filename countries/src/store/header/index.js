import { CHANGE_DARK_THEME } from "../../constants";

export const darkTheme = (isDark) => {
  return {
    type: CHANGE_DARK_THEME,
    payload: isDark,
  };
};

export const setDarkTheme = (
  state = JSON.parse(localStorage.getItem("dark-mode")),
  action
) => {
  if (action.type === CHANGE_DARK_THEME) {
    return (state = action.payload);
  }

  return state;
};
