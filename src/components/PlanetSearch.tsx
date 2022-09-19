import * as React from "react";
import { useState } from "react";
import swapiGetter from "../services/swapiGetter";
import {
  ISearchBoxStyles,
  IStackTokens,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SearchBox,
  Stack,
} from "@fluentui/react";
import { setIconOptions } from "@fluentui/react/lib/Styling";
import PlanetResponse from "./PlanetResponse";
import { SwapiPlanetsList } from "../models/swapiPlanets";

function PlanetSearch(): JSX.Element {
  const [responseSvc, setResponseSvc] = useState<SwapiPlanetsList>();
  const [responseItemCount, setResponseItemCount] = useState(0);
  const [error, setError] = useState<unknown>();
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);
  const [target, setTarget] = useState("");

  const stackTokens: IStackTokens = { childrenGap: 15 };
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 600 } };
  setIconOptions({ disableWarnings: true });

  const searchTheGalaxy = async (e: any) => {
    if (target.length === 0) {
      console.log("Target Is Empty!");
      return;
    }
    try {
      setIsLoadingSvc(true);
      const url = "planets/?search=" + target;
      console.log(url);
      const res = await swapiGetter(url, "");
      setResponseSvc(res);
    } catch (err) {
      console.error(JSON.stringify(err));
      setError(err);
    } finally {
      setIsLoadingSvc(false);
      localStorage.setItem("PlanetSearch", target);
    }
    if (responseSvc !== undefined) {
      setResponseItemCount(responseSvc.count);
    } else {
      setResponseItemCount(0);
    }
  };

  if (error)
    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        dismissButtonAriaLabel="close"
        isMultiline={true}
      >
        {JSON.stringify(error)}
      </MessageBar>
    );

  return (
    <>
      <form onSubmit={searchTheGalaxy} style={{ padding: "1em" }}>
        <Stack horizontal tokens={stackTokens}>
          <SearchBox
            disabled={isLoadingSvc}
            styles={searchBoxStyles}
            placeholder="Search the Star Wars Universe"
            onChange={(_, newValue) => {
              if (newValue !== undefined) {
                setTarget(newValue.toLowerCase());
                //console.log("Target string: " + target);
              }
            }}
            onSearch={(e) => {
              searchTheGalaxy(e);
            }}
            width={500}
            onEscape={(e) => {
              console.log("Custom onEscape Called");
              setTarget("");
            }}
            onClear={(e) => {
              console.log("Custom onClear Called");
              setTarget("");
            }}
          />
          <PrimaryButton
            disabled={isLoadingSvc}
            text="Intergalactic Search"
            onClick={(e) => searchTheGalaxy(e)}
          />
        </Stack>
      </form>
      <PlanetResponse search={target} isLoading={isLoadingSvc} responseSvc={responseSvc}/>
    </>
  );
}

export default PlanetSearch;
