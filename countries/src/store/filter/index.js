import { FILTER_COUNTRY } from "../../constants";

export const filterCountry = (filterData) => {
  return { type: FILTER_COUNTRY, payload: filterData };
};

export const setFilterCountry = (state = "", action) => {
  if (action.type === FILTER_COUNTRY) {
    return (state = action.payload);
  }

  return state;
};
