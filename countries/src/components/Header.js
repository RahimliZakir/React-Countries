import React, { useEffect } from "react";
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

  useEffect(() => {
    darkThemeState
      ? localStorage.setItem("dark-mode", true)
      : localStorage.setItem("dark-mode", false);
  }, [darkThemeState]);

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
            <Col md="6" className="left-nav">
              <h4 className={lightenClass}>Where in the world?</h4>
            </Col>
            <Col md="6" className="right-nav">
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
