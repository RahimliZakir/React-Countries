import React from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { darkTheme } from "../store/header";

import { FaMoon } from "react-icons/fa";

const Header = () => {
  const darkThemeState = useSelector((state) => state.setDarkTheme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(darkTheme(!darkThemeState));
  };

  localStorage.setItem("dark-mode", darkThemeState);
  //* useEffect-den evvel ishe dushur
  const localStorageTheme = JSON.parse(localStorage.getItem("dark-mode"));

  const darkenNavClass = classNames({
    "dark-mode": localStorageTheme,
  });

  const lightenClass = classNames({
    "dark-mode-text": localStorageTheme,
  });

  return (
    <header>
      <Navbar className={darkenNavClass}>
        <Container>
          <Row>
            <Col xl="6" lg="6" md="6" sm="6" className="left-nav col-6">
              <h4 className={lightenClass}>Where in the world?</h4>
            </Col>
            <Col xl="6" lg="6" md="6" sm="6" className="right-nav col-6">
              <button
                onClick={handleThemeChange}
                className={`dark-mode-btn ${lightenClass}`}
              >
                <FaMoon /> Dark Mode
              </button>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
