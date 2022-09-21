import React from "react";
import {
  Stack,
  Text,
  Link as FluentLink,
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
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import SquadFooter from "./SquadFooter";
import PlanetSearch from "./components/PlanetSearch";

initializeIcons();

document.title = "Star Wars API";
const boldStyle: Partial<ITextStyles> = {
  root: { fontWeight: FontWeights.semibold, backgroundColor: "silver" },
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
    <div className="container-fluid">
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
            <Card
              style={{
                width: "100%",
                borderStyle: "double",
                backgroundColor: "silver",
              }}
            >
              <Card.Body>
                <Text variant="xxLarge" styles={boldStyle}>
                  Welcome to the Star Wars Info Centre
                </Text>
              </Card.Body>
            </Card>
            {/* <Affiliation backgroundColour="grey" stackStyle={stackStyles}/> */}
            {/* <ChosenColoursUsingState /> */}
            {/* <PlanetSearch /> */}
            <PeopleSearch />
            <PlanetSearch />
            {/* <GitInfo/> */}
          </Stack>
        </div>
      </div>
      <SquadFooter />
    </div>
  );
};
