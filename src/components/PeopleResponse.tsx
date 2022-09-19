import { IDocumentCardStyles, IImageProps, Image } from "@fluentui/react";
import { IPeopleResponseProps } from "./IPeopleResponseProps";
import notFoundPic from "../media/wookie.jpg";
import MyLoadingSpinner from "./MyLoadingSpinner";
import PersonDisplay from "./PersonDisplay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

  function getHomeworldLink(url: string): string {
    const str = "/planet?id=";
    let text = url.slice(0, url.length - 1);
    let id = text.slice(text.lastIndexOf("/") + 1);
    return str.concat(id);
  }

  function getSpeciesLink(url: string): string {
    const str = "/species?id=";
    try {
      let text = url.slice(0, url.length - 1);
      let id = text.slice(text.lastIndexOf("/") + 1);
      return str.concat(id);
    } catch {
      return "/species";
    }
  }

  if (props.isLoading)
    return (
      <MyLoadingSpinner
        divHeight={300}
        loadingText="Scanning Jedi Archives.."
      />
    );

  if (!props.responseSvc)
    return (
      <div style={{ height: 300 }}>
        <Image {...imageNoFoundProps} alt="What a Wookie!" width={400} />
      </div>
    );

  if (props.responseSvc.count === 0)
    return (
      <div style={{ height: 300 }}>
        We searched for {props.search} to the outer rim and have found nothing..
        <h2>These aren't the people you are looking for</h2>
      </div>
    );

  return (
    // <div style={{ width: 100 / props.responseSvc.count + "%" }}>
    <div>
      <Row xs={1} md={2} lg={2} className="g-5">
        {props.responseSvc === null
          ? null
          : props.responseSvc?.results?.map((peeps) => (
              <>
                <Col>
                  <PersonDisplay character={peeps} />
                </Col>
              </>
            ))}
      </Row>
    </div>
  );
}

export default PeopleResponse;
