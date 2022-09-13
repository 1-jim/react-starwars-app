import {
  getTheme,
  IStackTokens,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import { useState, useEffect } from "react";

function Affiliation(): JSX.Element {
  const stackTokens: IStackTokens = { childrenGap: 15 };
  const [chosenSide, setChosenSide] = useState<string>();
  const theme = getTheme();

  useEffect(() => {
    if (chosenSide !== undefined) {
      console.log("You chose wisely " + chosenSide);
    }
  }, [chosenSide]);

  return (
    <div style={{ boxShadow: theme.effects.elevation8, padding: "2em" }}>
      {chosenSide !== undefined ? (
        <h2>You have made your choice and become a {chosenSide}</h2>
      ) : (
        <h2>Choose Your Side</h2>
      )}

      <Stack tokens={stackTokens} horizontal>
        <PrimaryButton
          text="Dark Side"
          onClick={() => setChosenSide("Dark Lord of the Sith")}
          style={{ width: 200 }}
        ></PrimaryButton>
        <PrimaryButton
          text="Light Side"
          onClick={() => setChosenSide("Jedi Master")}
          style={{ width: 200 }}
        ></PrimaryButton>
        <PrimaryButton
          text="Who Gives a Wookie"
          onClick={() => setChosenSide("Walking Carpet")}
          style={{ width: 200 }}
        ></PrimaryButton>
      </Stack>
    </div>
  );
}

export default Affiliation;
