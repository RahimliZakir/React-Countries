import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import classNames from "classnames";

import API from "../api";
import { addCommas } from "../utils/addCommas";

const Cards = () => {
  const [countries, setCountries] = useState([]);

  const searchText = useSelector((state) => state.setSearchCountry);
  const filterData = useSelector((state) => state.setFilterCountry);

  const darkMode = useSelector((state) => state.setDarkTheme);

  const darkenClass = classNames({
    "dark-mode": darkMode,
  });

  const query = `?continent=${filterData}&searchedText=${searchText}`;

  const getCountries = async () => {
    const { data } = await API.get("/all");
    setCountries(
      data.filter((item) => item.name.common.toLowerCase() !== "armenia")
    );
  };

  const filteredCountries = countries
    ?.filter((item) => {
      if (filterData !== "") {
        return item.region.toLowerCase() === filterData;
      } else {
        return countries;
      }
    })
    ?.sort((a, b) => a.name.common.localeCompare(b.name.common));

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <section id="cards">
      <Container>
        <Row>
          {filteredCountries?.map((item, index) => {
            return (
              <Col md="3" className="mb-3" key={index}>
                <Card className={darkenClass}>
                  <Card.Img variant="top" src={item.flags.png} />
                  <Card.Body>
                    <Card.Title>{item.name.common}</Card.Title>
                    <div className="card-text">
                      <p>Population: {addCommas(item.population)}</p>
                      <p>Region: {item.region}</p>
                      <p>Capital: {item.capital}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Cards;
