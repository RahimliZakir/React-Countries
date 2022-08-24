import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import classNames from "classnames";

import API from "../api";
import { addDots } from "../utils/addDots";

const Cards = () => {
  const [countries, setCountries] = useState([]);

  const searchText = useSelector((state) => state.setSearchCountry);
  const filterData = useSelector((state) => state.setFilterCountry);

  const localStorageTheme = JSON.parse(localStorage.getItem("dark-mode"));

  const darkenClass = classNames({
    "dark-mode": localStorageTheme,
  });

  // const query = `?continent=${filterData}&searchedText=${searchText}`;

  const getCountries = async () => {
    const { data } = await API.get("/all");
    setCountries(
      data.filter((item) => item.name.common.toLowerCase() !== "armenia")
    );
  };

  useEffect(() => {
    getCountries();
  }, []);

  const filteredCountries = countries
    ?.filter((item) => {
      if (filterData !== "") {
        return item.region.toLowerCase() === filterData;
      } else {
        return item;
      }
    })
    ?.filter((item) => {
      if (searchText !== "") {
        return item.name.common.toLowerCase().startsWith(searchText);
      } else {
        return item;
      }
    })
    ?.sort((a, b) => a.name.common.localeCompare(b.name.common));

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
                      <p>Population: {addDots(item.population)}</p>
                      <p>Region: {item.region}</p>
                      <p>Capital: {item.capital}</p>
                    </div>
                    <a className="btn btn-info">Details</a>
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
