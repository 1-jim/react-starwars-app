import {
  getTheme,
  IStackStyles,
  IStackTokens,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { useState, useEffect } from "react";
import { IAffiliationProps } from "./IAffiliationProps";

function Affiliation(props: IAffiliationProps): JSX.Element {
  const stackTokens: IStackTokens = { childrenGap: 30 };
  const [chosenSide, setChosenSide] = useState<string>();
  const theme = getTheme();

  useEffect(() => {
    if (chosenSide !== undefined) {
      console.log("You chose wisely " + chosenSide);
    }
  }, [chosenSide]);

  return (
    <div
      style={{
        width: "90%",
        boxShadow: theme.effects.elevation8,
        background: props.backgroundColour,
        padding: "2em",
      }}
    >
      <div className="App-h2">
        {chosenSide !== undefined ? (
          <h2>You have made your choice to become a {chosenSide}</h2>
        ) : (
          <h2>Choose Your Side</h2>
        )}
      </div>
      <Stack
        tokens={stackTokens}
        horizontal
        horizontalAlign="center"
        verticalAlign="center"
        verticalFill
        styles={props.stackStyle}
      >
        <PrimaryButton
          text="Dark Side"
          onClick={() => setChosenSide("Dark Lord of the Sith")}
          style={{ width: 200, marginBottom:20 }}
        ></PrimaryButton>
        <PrimaryButton
          text="Light Side"
          onClick={() => setChosenSide("Jedi Master")}
          style={{ width: 200, marginBottom:20 }}
        ></PrimaryButton>
        <PrimaryButton
          text="Who Gives a Wookie"
          onClick={() => setChosenSide("Walking Carpet")}
          style={{ width: 200, marginBottom:20 }}
        ></PrimaryButton>
      </Stack>
    </div>
  );
}

export default Affiliation;
