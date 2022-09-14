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
import { setIconOptions } from "@fluentui/react/lib/Styling";
import { SwapiPeopleList } from "../models/swapiPeople";
function PeopleSearch(): JSX.Element {
  const [responseSvc, setResponseSvc] = useState<SwapiPeopleList>();
  const [error, setError] = useState<unknown>();
  const [isWookieLang, setIsWookieLang] = useState(false);
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);
  const [target, setTarget] = useState("");

  const stackTokens: IStackTokens = { childrenGap: 15 };
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 600 } };
  setIconOptions({ disableWarnings: true });

  const cardStyles: IDocumentCardStyles = {
    root: { display: "inline-block", marginRight: 20, width: 320 },
  };

  function wookieLangugeChange() {
    setIsWookieLang(!isWookieLang);
    console.log("Wookie Language" + isWookieLang ? " Enabled" : "Disabled");
  }

  async function searchForText(): Promise<void> {
    setIsLoadingSvc(true);
    alert("You searched for " + target);
    const oldTarget = localStorage.getItem("PeopleSearch");
    if (oldTarget !== null) {
      setTarget(oldTarget);
    }
    setIsLoadingSvc(false);
  }

  async function DoPeopleFetch(): Promise<any> {
    useEffect(() => {
      if (isLoadingSvc) {
        console.log("already loading service");
        return;
      }

      const fetchData = async () => {
        try {
          setIsLoadingSvc(true);
          const res = await swapiGetter("people/?search=" + target, "");
          setResponseSvc(res);
        } catch (err) {
          console.error(JSON.stringify(err));
          setError(err);
        } finally {
          setIsLoadingSvc(false);
        }
      };

      if (target.length > 0) {
        void fetchData();
      }
    }, [isLoadingSvc, target]);
  }

  const searchTheGalaxy = async (e: any) => {
    if (target.length === 0) {
      console.log("Target Is Empty!");
      return;
    }
    try {
      setIsLoadingSvc(true);
      let url = "people/?search=" + target;
      if (isWookieLang) {
        url = "people/?search=" + target + "&format=wookiee";
      }
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
      <Toggle
        label="Wookie Language Translator"
        onText="Enabled"
        offText="Disabled"
        onChange={wookieLangugeChange}
      />
      <form onSubmit={searchTheGalaxy} style={{ padding: "1em" }}>
        <Stack horizontal tokens={stackTokens}>
          <SearchBox
            disabled={isLoadingSvc}
            styles={searchBoxStyles}
            placeholder="Search the Star Wars Universe"
            onChange={(_, newValue) => {
              if (newValue !== undefined) {
                setTarget(newValue.toLowerCase());
              }
            }}
            onSearch={(e) => searchTheGalaxy(e)}
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
              <DocumentCardTitle title={peeps.name} />
              <DocumentCardDetails>
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
    </>
  );
}

export default PeopleSearch;
