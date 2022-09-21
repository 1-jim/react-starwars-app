import { IDocumentCardStyles, IImageProps, Image } from "@fluentui/react";
import { IPeopleResponseProps } from "./IPeopleResponseProps";
import notFoundPic from "../media/wookie.jpg";
import MyLoadingSpinner from "./MyLoadingSpinner";
import PersonDisplay from "./PersonDisplay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function PeopleResponse(props: IPeopleResponseProps): JSX.Element {
  const imageNoFoundProps: Partial<IImageProps> = {
    src: "https://66.media.tumblr.com/011f129630947e8a7559b2a8d36e5010/tumblr_nsh0bcNJpI1so3q95o1_400.gif",
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

  function getWidth(size: string): number {
    let value = 12;
    if (!props.responseSvc) return value;
    switch (size) {
      case "md":
        if (props.responseSvc.count > 1) value = 6;
        break;
      case "lg":
        if (props.responseSvc.count > 1)
          if (props.responseSvc.count > 2) value = 6;
        break;
      case "xl":
        if (props.responseSvc.count > 1)
          if (props.responseSvc.count > 2) {
            value = 4;
          } else {
            value = 6;
          }
        break;
      default:
        break;
    }
    return value;
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
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <Row>
        {props.responseSvc === null
          ? null
          : props.responseSvc?.results?.map((peeps) => (
              <>
                <Col
                  xs={getWidth("xs")}
                  sm={getWidth("sm")}
                  md={getWidth("md")}
                  lg={getWidth("lg")}
                  xl={getWidth("xl")}
                >
                  <PersonDisplay key={peeps.url} character={peeps} />
                </Col>
              </>
            ))}
      </Row>
    </div>
  );
}

export default PeopleResponse;
