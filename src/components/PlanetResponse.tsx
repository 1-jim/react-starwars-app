import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardStyles,
  Label,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { Link } from 'react-router-dom';
import { IPlanetResponseProps } from "./IPlanetResponseProps";

function PlanetResponse(props: IPlanetResponseProps): JSX.Element {
  const cardStyles: IDocumentCardStyles = {
    root: {
      display: "inline-block",
      marginRight: 20,
      width: 280,
      paddingBottom: 5,
      backgroundColor: "black",
    },
  };

  function linkToResidents(residents: any) {
    return <div style={{ height: 600 }}>{JSON.stringify(residents)}</div>;
  }

  if (props.isLoading)
    return (
      <div style={{ height: 600 }}>
        <Spinner
          size={SpinnerSize.large}
          label="Long Range Scanning..."
          ariaLive="assertive"
          labelPosition="left"
        />
      </div>
    );

    if (!props.responseSvc) return <div style={{ height: 600 }}></div>;

  if (props.responseSvc.count === 0)
    return (
      <div style={{ height: 600 }}>
        We searched for '{props.search}', all the way to the outer rim..
        <h2>This is not the planet you are looking for</h2>
      </div>
    );

  return (
    <div style={{ width: 100 / props.responseSvc.count + "%" }}>
      {props.responseSvc === null
        ? null
        : props.responseSvc?.results?.map((planet) => (
            <DocumentCard
              key={planet.created}
              aria-label={"Star Wars Character:" + planet.name}
              type={DocumentCardType.normal}
              styles={cardStyles}
              onClickHref={planet.url}
            >
              <DocumentCardTitle
                title={planet.name}
                className="App-DocCardTitle"
              />
              <DocumentCardDetails className="App-DocCardBody">
                <Label>Diameter: {planet.diameter}</Label>
                <Label>Gravity: {planet.gravity}</Label>
                <Label>Population: {planet.population}</Label>
                <Label>Climate: {planet.climate}</Label>
                <Label>Rotation Period: {planet.rotation_period}</Label>
                <Label onClick={linkToResidents}>
                  Residents: {planet.residents}
                </Label>
              </DocumentCardDetails>
            </DocumentCard>
          ))}
    </div>
  );
}

export default PlanetResponse;
