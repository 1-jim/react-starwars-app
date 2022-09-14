import * as React from "react";
import { useEffect, useState } from "react";
import swapiGetter from "../services/swapiGetter";
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardStyles,
  ISearchBoxStyles,
  IStackTokens,
  Label,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SearchBox,
  Spinner,
  SpinnerSize,
  Stack,
  Toggle,
} from "@fluentui/react";
import { DefaultPalette, setIconOptions } from "@fluentui/react/lib/Styling";
import { SwapiPeopleList } from "../models/swapiPeople";
function PeopleSearch(): JSX.Element {
  const [responseSvc, setResponseSvc] = useState<SwapiPeopleList>();
  const [responseItemCount, setResponseItemCount] = useState(0);
  const [error, setError] = useState<unknown>();
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);
  const [target, setTarget] = useState("");

  const stackTokens: IStackTokens = { childrenGap: 15 };
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 600 } };
  setIconOptions({ disableWarnings: true });

  const cardStyles: IDocumentCardStyles = {
    root: {
      display: "inline-block",
      marginRight: 20,
      width: 280,
      paddingBottom: 5,
      backgroundColor: "black",
    },
  };

  async function searchForText(): Promise<void> {
    setIsLoadingSvc(true);
    alert("You searched for " + target);
    const oldTarget = localStorage.getItem("PeopleSearch");
    if (oldTarget !== null) {
      setTarget(oldTarget);
    }
    setIsLoadingSvc(false);
  }

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
      setTarget("");
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
            text="Search your feelings.."
            onClick={(e) => searchTheGalaxy(e)}
          />
        </Stack>
      </form>
      {isLoadingSvc ? (
        <Spinner
          size={SpinnerSize.large}
          label="Long Range Scanning..."
          ariaLive="assertive"
          labelPosition="left"
        />
      ) : null}
      <div style={{ width: 100 / responseItemCount + "%" }}>
        {responseSvc === null
          ? null
          : responseSvc?.results?.map((peeps) => (
              <DocumentCard
                key={peeps.created}
                aria-label={"Star Wars Character:" + peeps.name}
                type={DocumentCardType.normal}
                styles={cardStyles}
                onClickHref={peeps.url}
              >
                <DocumentCardTitle
                  title={peeps.name}
                  className="App-DocCardTitle"
                />
                <DocumentCardDetails className="App-DocCardBody">
                  <Label>Gender: {peeps.gender}</Label>
                  <Label>Eye Colour: {peeps.eye_color}</Label>
                  <Label>Gender: {peeps.gender}</Label>
                  <Label>Skin Colour: {peeps.skin_color}</Label>
                  <Label>Height: {peeps.height}</Label>
                  <Label onClick={searchForText}>
                    Homeworld: {peeps.homeworld}
                  </Label>
                  <Link onClick={searchForText}>Homeworld</Link>
                </DocumentCardDetails>
              </DocumentCard>
            ))}
      </div>
    </>
  );
}

export default PeopleSearch;
