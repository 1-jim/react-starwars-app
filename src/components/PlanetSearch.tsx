import { useEffect, useState } from "react";
import swapiGetter from "../services/swapiGetter";
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardType,
  getTheme,
  IDocumentCardStyles,
  IStackTokens,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
} from "@fluentui/react";
import { SwapiPlanets } from "../models/swapiPlanets";
import { AxiosError } from "axios";
import axios, { AxiosResponse } from "axios";

function PeopleSearch(): JSX.Element {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [planetData, setPlanetData] = useState<SwapiPlanets>();
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);
  const [fetchUrl, setFetchUrl] = useState<string>();
  const theme = getTheme();
  const stackTokens: IStackTokens = { childrenGap: 15 };

  const cardStyles: IDocumentCardStyles = {
    root: { display: "inline-block", marginRight: 20, width: 320 },
  };

  async function DoServiceFetch(): Promise<any> {
    useEffect(() => {
      if (isLoadingSvc) {
        console.log("already loading service");
        return;
      }

      const fetchData = async () => {
        try {
          setIsLoadingSvc(true);
          const resp = await swapiGetter("planets", "");
          const res = await axios.get("https://swapi.dev/api/planets");
          setResponse(res);
          if (response?.data.results !== null) {
            const swPlanets: SwapiPlanets = res.data.results;
            setPlanetData(swPlanets);
          } else {
            console.error("no results found in web call");
          }
          setFetchUrl(undefined);
        } catch (err) {
          console.error(err);
          //setError(err);
        }
      };

      void fetchData();
      setIsLoadingSvc(false);
    }, [isLoadingSvc]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const thing = DoServiceFetch();
  console.log(JSON.stringify(planetData));

  return (
    <div style={{ boxShadow: theme.effects.elevation8, padding: "2em" }}>
      <PrimaryButton
        style={{ padding: 50 }}
        text="Push the Button"
        onClick={() => setItOff()}
      />
      <hr></hr>
      <Stack horizontal tokens={stackTokens}>
        <PrimaryButton
          text="Previous"
          onClick={() => setFetchUrl(response?.data.previous)}
          style={{ width: 300 }}
        />
        <PrimaryButton
          text="Next"
          onClick={() => setFetchUrl(response?.data.next)}
          style={{ width: 300 }}
        />
      </Stack>
      {error !== undefined && (
        <MessageBar
          messageBarType={MessageBarType.error}
          dismissButtonAriaLabel="close"
          isMultiline={true}
        />
      )}
      <Stack tokens={stackTokens}>
        {planetData === undefined ? (
          <p>No Data!</p>
        ) : isLoadingSvc ? (
          <Spinner
            size={SpinnerSize.large}
            label="Reticulating Splines"
            ariaLive="assertive"
            labelPosition="left"
          />
        ) : (
          planetData?.results?.map((planet, index) => (
            <>
              <p>{index}</p>

              <DocumentCard
                aria-label={"Star Wars Planet:" + planet.name}
                type={DocumentCardType.compact}
                styles={cardStyles}
                onClickHref={(planet.url)}
              >
                <DocumentCardTitle title={planet.name} />
                <DocumentCardDetails>
                  <Label>Population: {planet.population}</Label>
                </DocumentCardDetails>
              </DocumentCard>
            </>
          ))
        )}
      </Stack>
    </div>
  );
}

export default PeopleSearch;

function searchForText(): void {
  alert("You clicked me!");
}
function setItOff(): void {
  alert("You set it off!");
}
