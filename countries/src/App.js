import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import classNames from "classnames";

import Header from "./components/Header";
import Search from "./components/Search";
import Filter from "./components/Filter";
import Cards from "./components/Cards";

import "./scss/style.scss";

const App = () => {
  const darkMode = useSelector((state) => state.setDarkTheme);

  const darkenClass = classNames({
    "dark-mode": darkMode,
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
        <Cards />
      </main>
    </div>
  );
};

export default App;
