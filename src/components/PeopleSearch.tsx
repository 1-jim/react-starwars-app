import { useState } from "react";
import swapiGetter from "../services/swapiGetter";
import {
  ISearchBoxStyles,
  IStackTokens,
  MessageBar,
  MessageBarType,
  SearchBox,
  Stack,
} from "@fluentui/react";
import { setIconOptions } from "@fluentui/react/lib/Styling";
import { SwapiPeopleList } from "../models/swapiPeople";
import PeopleResponse from "./PeopleResponse";
import { Button } from "react-bootstrap";
function PeopleSearch(): JSX.Element {
  const [responseSvc, setResponseSvc] = useState<SwapiPeopleList>();
  const [error, setError] = useState<unknown>();
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);
  const [target, setTarget] = useState("");

  const stackTokens: IStackTokens = { childrenGap: 15 };
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 400, height: 50 } };
  setIconOptions({ disableWarnings: true });

  const searchTheGalaxy = async (e: any) => {
    if (target.length === 0) {
      console.log("Target Is Empty!");
      return;
    }
    try {
      setIsLoadingSvc(true);
      const url = "people/?search=" + target;
      console.log(url);
      const res = await swapiGetter(url, "");
      setResponseSvc(res);
    } catch (err) {
      console.error(JSON.stringify(err));
      setError(err);
    } finally {
      setIsLoadingSvc(false);
      localStorage.setItem("PeopleSearch", target);
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
            placeholder="Find Characters in the Star Wars Universe"
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
          <Button variant="outline-light" disabled={isLoadingSvc} onClick={(e) => searchTheGalaxy(e)}>
            Search the Archive
          </Button>
        </Stack>
      </form>
      <PeopleResponse search={target} isLoading={isLoadingSvc} responseSvc={responseSvc}/>
    </>
  );
}

export default PeopleSearch;
