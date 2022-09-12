import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import API from "../api";
import { addDots } from "../utils/addDots";

const Details = () => {
  const [country, setCountry] = useState(null);

  const params = useParams();

  useEffect(() => {
    API.get(`/name/${params.name}`).then(({ data }) => setCountry(data[0]));

    // eslint-disable-next-line
  }, []);

  console.log(country);

  return (
    <section id="country-details">
      <Container>
        {country && (
          <Row>
            <Col md="12" className="go-back-side">
              <Link to="/" className="go-back-btn">
                <FontAwesomeIcon icon={faArrowLeftLong} /> Back
              </Link>
            </Col>
            <Col md="6" className="details-left-side">
              <div className="img-div">
                <img src={country.flags.png} alt="Country Flag" />
              </div>
            </Col>
            <Col md="6" className="details-right-side">
              <h3>{country.name.common}</h3>
              <div className="country-details-lists">
                <ul className="country-details-left-list">
                  <li>
                    <span>Native Name:</span> {country.altSpellings[2]}
                  </li>
                  <li>
                    <span>Population:</span> {addDots(country.population)}
                  </li>
                  <li>
                    <span>Region:</span> {country.region}
                  </li>
                  <li>
                    <span>Sub Region:</span> {country.subregion}
                  </li>
                  <li>
                    <span>Capital:</span> {country.capital}
                  </li>
                </ul>
                <ul className="country-details-right-list">
                  <li>
                    <span>Top Level Domain:</span> {country.tld}
                  </li>
                  <li>
                    <span>Currencies:</span>
                    {
                      country.currencies[Object.keys(country.currencies)[0]]
                        .name
                    }
                  </li>
                  <li>
                    <span>Languages:</span>
                    {country.languages[Object.keys(country.languages)[0]]}
                  </li>
                </ul>
              </div>
              <ul>
                <li>Border Countries:</li>
                <li></li>
              </ul>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Details;
