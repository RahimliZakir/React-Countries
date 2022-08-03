import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { setDarkTheme } from "./header";
import { setSearchCountry } from "./search";
import { setFilterCountry } from "./filter";

const reducers = combineReducers({
  setDarkTheme,
  setSearchCountry,
  setFilterCountry,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
