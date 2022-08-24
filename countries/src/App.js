import React from "react";
import { Container, Row } from "react-bootstrap";
import classNames from "classnames";

import Header from "./components/Header";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Cards from "./components/Cards";

import "./scss/style.scss";

const App = () => {
  const localStorageTheme = JSON.parse(localStorage.getItem("dark-mode"));

  const darkenClass = classNames({
    "dark-mode": localStorageTheme,
  });

  return (
    <div className="App">
      <Header />
      <main className={darkenClass}>
        <section id="filter-search">
          <Container>
            <Row>
              <Search />
              <Filter />
              <Cards />
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default App;
