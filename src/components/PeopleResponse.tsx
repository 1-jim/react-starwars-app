import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardStyles,
  IImageProps,
  Image,
  Label,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { IPeopleResponseProps } from "./IPeopleResponseProps";
import { Link } from "react-router-dom";
import notFoundPic from '../media/wookie.jpg';

function PeopleResponse(props: IPeopleResponseProps): JSX.Element {
  const imageNoFoundProps: Partial<IImageProps> = {
    src: notFoundPic,
    // Show a border around the image (just for demonstration purposes)
    styles: (props) => ({
      root: { border: "1px solid " + props.theme.palette.neutralSecondary },
    }),
  };

  const cardStyles: IDocumentCardStyles = {
    root: {
      display: "inline-block",
      marginRight: 20,
      width: 280,
      paddingBottom: 5,
      backgroundColor: "black",
    },
  };

  function linkToHomeworld() {
    return <div style={{ height: 600 }}>Build-Homeworld!</div>;
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

  if (!props.responseSvc)
    return (
      <div style={{ height: 600 }}>
        <Image
          {...imageNoFoundProps}
          alt="What a Wookie!"
          width={400}
        />
      </div>
    );

  if (props.responseSvc.count === 0)
    return (
      <div style={{ height: 600 }}>
        We searched for {props.search} to the outer rim and have found nothing..
        <h2>These aren't the people you are looking for</h2>
      </div>
    );

  return (
    <div style={{ width: 100 / props.responseSvc.count + "%" }}>
      {props.responseSvc === null
        ? null
        : props.responseSvc?.results?.map((peeps) => (
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
                <Label>Hair: {peeps.hair_color}</Label>
                <Label>Eyes: {peeps.eye_color}</Label>
                <Label>Skin: {peeps.skin_color}</Label>
                <Label>Height: {peeps.height}</Label>
                <Label>Weight: {peeps.mass}</Label>
                <Label>Gender: {peeps.gender}</Label>
                <Label>Species: {peeps.species}</Label>
                <Label onClick={linkToHomeworld}>
                  Homeworld: {peeps.homeworld}
                </Label>
              </DocumentCardDetails>
            </DocumentCard>
          ))}
    </div>
  );
}

export default PeopleResponse;
