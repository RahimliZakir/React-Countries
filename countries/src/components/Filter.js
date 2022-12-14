import React from "react";
import { Col, InputGroup } from "react-bootstrap";
import Select from "react-select";
import { useDispatch } from "react-redux";

import { filterCountry } from "../store/filter";

const options = [
  { value: "", label: "---Select---" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <Col xl="6" lg="6" md="6" sm="12" className="filter-col">
      <InputGroup>
        <Select
          placeholder="Filter by Region"
          options={options}
          onChange={(opt) => dispatch(filterCountry(opt.value))}
        />
      </InputGroup>
    </Col>
  );
};

export default Filter;
