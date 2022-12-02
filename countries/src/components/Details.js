import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import API from "../api";
import { toHash } from "../utils/hashUtil";
import { addDots } from "../utils/sanitaizerUtil";
import Loader from "./Loader";

const Details = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);

  const { name } = useParams();

  useEffect(() => {
    setIsLoading(true);
    API.get(`/name/${name}?fullText=true`).then(({ data }) =>
      setCountry(data[0])
    );

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getBorderCountries = async () => {
      const { data } = await API.get("/all");

      setBorders(
        data?.filter((item) => country?.borders?.includes(item?.cca3))
      );

      setIsLoading(false);
    };

    if (country != null) getBorderCountries();
  }, [country]);

  return (
    <section id="country-details">
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          {country && (
            <Row>
              <Col xl="12" lg="12" md="12" sm="12" className="go-back-side">
                <Link
                  to={`/#${toHash(country.name.common)}`}
                  className="go-back-btn"
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} /> Back
                </Link>
              </Col>
              <Col xl="6" lg="6" md="12" sm="12" className="details-left-side">
                <div className="img-div">
                  <img src={country.flags.png} alt="Country Flag" />
                </div>
              </Col>
              <Col xl="6" lg="6" md="12" sm="12" className="details-right-side">
                <h3 className="country-heading">{country.name.common}</h3>
                <div className="country-details-lists">
                  <ul className="country-details-left-list">
                    <li>
                      <b>Native Name: </b> {country.altSpellings[2]}
                    </li>
                    <li>
                      <b>Population: </b> {addDots(country.population)}
                    </li>
                    <li>
                      <b>Region: </b> {country.region}
                    </li>
                    <li>
                      <b>Sub Region: </b> {country.subregion}
                    </li>
                    <li>
                      <b>Capital: </b> {country.capital}
                    </li>
                  </ul>
                  <ul className="country-details-right-list">
                    <li>
                      <b>Top Level Domain: </b> {country.tld}
                    </li>
                    <li>
                      <b>Currencies: </b>
                      {Object.keys(country.currencies).map((item) => (
                        <span key={country.currencies[item].name}>
                          {country.currencies[item].name}
                        </span>
                      ))}
                    </li>
                    <li>
                      <b>Languages: </b>

                      {Object.keys(country.languages).map((item) => {
                        return (
                          <span key={country.languages[item]}>
                            {country.languages[item]}
                          </span>
                        );
                      })}
                    </li>
                  </ul>
                </div>
                <ul className="border-countries-ul">
                  <li>
                    <b>Border Countries: </b>
                  </li>
                  {borders?.map((item, index) => {
                    return (
                      <li key={index}>
                        <span className="badge-custom">
                          {item?.name?.common}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </section>
  );
};

export default Details;
