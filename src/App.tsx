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
import PeopleSearch from "./components/PeopleSearch";
import PlanetSearch from "./components/PlanetSearch";
import Affiliation from "./components/Affiliation";
import ChosenColours from "./components/ChosenColours";

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
    <div className="background-container">
      <div className="">
        <Stack
          horizontalAlign="center"
          verticalAlign="center"
          verticalFill
          styles={stackStyles}
          tokens={stackTokens}
        >
          <img className="App-logo" src={mainPic} alt="logo" />
          <Text variant="xxLarge" styles={boldStyle}>
            Welcome to the Star Wars Universe
          </Text>
          <Affiliation />
          <ChosenColours/>
          {/* <PlanetSearch /> */}
          {/* <PeopleSearch /> */}
        </Stack>
      </div>
    </div>
  );
};
