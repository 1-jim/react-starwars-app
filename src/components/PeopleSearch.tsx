import * as React from "react";
import { useEffect, useState } from "react";
import swapiGetter from "../services/swapiGetter";
import {
  ISearchBoxStyles,
  IStackTokens,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  SearchBox,
  Spinner,
  SpinnerSize,
  Stack,
} from "@fluentui/react";

function PeopleSearch(): JSX.Element {
  const [responseSvc, setResponseSvc] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);

  const stackTokens: IStackTokens = { childrenGap: 15 };
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 600 } };

  async function DoPeopleFetch(): Promise<any> {
    useEffect(() => {
      if (isLoadingSvc) {
        console.log("already loading service");
        return;
      }

      const fetchData = async () => {
        try {
          setIsLoadingSvc(true);
          const res = await swapiGetter("people", 1);
          setResponseSvc(res);
        } catch (err) {
          console.error(err);
        }
      };

      void fetchData();
      setIsLoadingSvc(false);
    }, [isLoadingSvc]);
  }

  const thing = DoPeopleFetch();

  return (
    <>
      <p>{JSON.stringify(responseSvc)}</p>
      {error !== null && (
        <MessageBar
          messageBarType={MessageBarType.error}
          dismissButtonAriaLabel="close"
          isMultiline={true}
        />
      )}
      {isLoadingSvc ?
        <Spinner size={SpinnerSize.large} label="Reticulating Splines" ariaLive="assertive" labelPosition="left"/> : null
      }
      <Stack horizontal tokens={stackTokens}>
        <SearchBox
          styles={searchBoxStyles}
          placeholder="Search the Star Wars Universe"
          onSearch={(newValue) => console.log("value is " + newValue)}
          width={500}
        />
        <PrimaryButton text="Punch It Chewie" onClick={() => searchForText()} />
      </Stack>
    </>
  );
}

export default PeopleSearch;

function searchForText(): void {
  alert("You clicked me!");
}
