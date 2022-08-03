import { SEARCH_COUNTRY } from "../../constants";

// * 1) Action
const searchCountry = (searchText) => {
  return {
    type: SEARCH_COUNTRY,
    payload: searchText,
  };
};

//* 2) Reducer
const setSearchCountry = (state = "", action) => {
  if (action.type === SEARCH_COUNTRY) {
    return (state = action.payload);
  }

  return state;
};

export { searchCountry, setSearchCountry };
