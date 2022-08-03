import React from "react";
import { Col, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { searchCountry } from "../store/search";

const Search = () => {
  const value = useSelector((state) => state.setSearchCountry);
  const dispatch = useDispatch();

  return (
    <Col md="6" className="search-col">
      <InputGroup>
        <FaSearch />
        <FormControl
          className="search-input"
          placeholder="Search for a country..."
          value={value}
          onChange={(e) => dispatch(searchCountry(e.target.value))}
        />
      </InputGroup>
    </Col>
  );
};

export default Search;
