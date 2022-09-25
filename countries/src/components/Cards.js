import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useQuery } from "react-query";

import API from "../api";
import { addDots } from "../utils/sanitaizerUtil";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Cards = () => {
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);

  const searchText = useSelector((state) => state.setSearchCountry);
  const filterData = useSelector((state) => state.setFilterCountry);

  const darkThemeState = useSelector((state) => state.setDarkTheme);

  const darkenClass = classNames({
    "dark-mode": darkThemeState,
  });

  // const query = `?continent=${filterData}&searchedText=${searchText}`;

  const getCountries = async () => {
    setIsLoadingAPI(true);
    const { data } = await API.get("/all");
    setIsLoadingAPI(false);

    return data.filter((item) => item.name.common.toLowerCase() !== "armenia");
  };

  const {
    isLoading,
    isFetching,
    error,
    data: countries,
    status,
  } = useQuery("countries", getCountries);

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
      {isLoadingAPI ? (
        <Loader />
      ) : (
        <Container>
          <Row>
            {filteredCountries?.map((item, index) => {
              return (
                <Col xl="3" lg="3" md="4" sm="12" className="mb-3" key={index}>
                  <Card className={darkenClass}>
                    <Card.Img variant="top" src={item.flags.png} />
                    <Card.Body>
                      <Card.Title>{item.name.common}</Card.Title>
                      <div className="card-texts">
                        <p>Population: {addDots(item.population)}</p>
                        <p>Region: {item.region}</p>
                        <p>Capital: {item.capital}</p>
                      </div>
                      <Link
                        to={`details/${item.name.common.toLowerCase()}`}
                        className="btn btn-info"
                      >
                        Details
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </section>
  );
};

export default Cards;
