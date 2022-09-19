import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { mergeStyles } from "@fluentui/react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import PlanetSearch from "./components/PlanetSearch";
import PeopleSearch from "./components/PeopleSearch";
import PersonDisplay from "./components/PersonDisplay";
import PlanetDisplay from "./components/PlanetDisplay";
import SpeciesDisplay from "./components/SpeciesDisplay";
import ResidentsDisplay from "./components/ResidentsDisplay";


// Inject some global styles
mergeStyles({
  ":global(body,html,#root)": {
    margin: 0,
    padding: 0,
    height: "100vh",
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search">
        <Route path="world" element={<PlanetSearch />} />
        <Route path="character" element={<PeopleSearch />} />
      </Route>
      <Route path="/person" element={<PersonDisplay />} />
      <Route path="/planet" element={<PlanetDisplay />}>
        <Route path="residents" element={<ResidentsDisplay />} />
      </Route>
      <Route path="/species" element={<SpeciesDisplay />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
