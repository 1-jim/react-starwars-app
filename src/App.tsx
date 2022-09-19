import React from "react";
import {
  Stack,
  Text,
  Link,
  FontWeights,
  IStackTokens,
  IStackStyles,
  ITextStyles,
} from "@fluentui/react";
import mainPic from "./media/earth.png";
import "./App.css";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import PeopleSearch from "./components/PeopleSearch";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Outlet } from "react-router-dom";
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossOrigin="anonymous"
/>;

initializeIcons();

document.title = "Star Wars API";
const boldStyle: Partial<ITextStyles> = {
  root: { fontWeight: FontWeights.semibold, color: "white" },
};
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: "960px",
    margin: "0 auto",
    textAlign: "center",
    color: "#605e5c",
  },
};

export const App: React.FunctionComponent = () => {
  return (
    <Container className="p-3">
      <div className="background-container">
        <div className="stars">
          <Stack
            horizontalAlign="center"
            verticalAlign="center"
            verticalFill
            styles={stackStyles}
            tokens={stackTokens}
          >
            <img className="App-logo" src={mainPic} alt="logo" />
            <Card style={{ width: "80%", borderStyle: "double" }}>
              <Card.Body>
                <Text variant="xxLarge" styles={boldStyle}>
                  Welcome to the Star Wars Universe
                </Text>
              </Card.Body>
            </Card>
            {/* <Affiliation backgroundColour="grey" stackStyle={stackStyles}/> */}
            {/* <ChosenColoursUsingState /> */}
            {/* <PlanetSearch /> */}
            <PeopleSearch />
            {/* <GitInfo/> */}
          </Stack>
        </div>
      </div>
    </Container>
  );
};
