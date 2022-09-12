import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import API from "../api";
import { addDots } from "../utils/sanitaizerUtil";

const Details = () => {
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);

  const params = useParams();

  useEffect(() => {
    API.get(`/name/${params.name}`).then(({ data }) => setCountry(data[0]));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getBorderCountries = async () => {
      const { data } = await API.get("/all");

      setBorders(
        data?.filter((item) => country?.borders?.includes(item?.cca3))
      );
    };

    if (country != null) getBorderCountries();
  }, [country]);

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
                      <span>{item?.name?.common}</span>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Details;
