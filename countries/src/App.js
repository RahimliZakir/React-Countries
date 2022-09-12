import React, { Fragment } from "react";
import { Container, Row } from "react-bootstrap";
import classNames from "classnames";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Details from "./components/Details";

const App = () => {
  const localStorageTheme = JSON.parse(localStorage.getItem("dark-mode"));

  const darkenClass = classNames({
    "dark-mode": localStorageTheme,
  });

  return (
    <div className="App">
      <Header />
      <main className={darkenClass}>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <section id="filter-search">
                  <Container>
                    <Row>
                      <Search />
                      <Filter />
                    </Row>
                  </Container>
                </section>
                <Cards />
              </Fragment>
            }
          />
          <Route path="details/:name" element={<Details />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
