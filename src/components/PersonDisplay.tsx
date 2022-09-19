import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardTitle,
  DocumentCardType,
  IDocumentCardStyles,
  Label,
  Link as FluentLink,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SwapiPerson } from "../models/swapiPeople";
import swapiGetter from "../services/swapiGetter";
import { IPersonDisplayProps } from "./IPersonDisplayProps";
import MyLoadingSpinner from "./MyLoadingSpinner";
import SpeciesDisplay from "./SpeciesDisplay";

export default function PersonDisplay(props: IPersonDisplayProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [responseSvc, setResponseSvc] = useState<SwapiPerson>();
  const [isLoading, setIsLoading] = useState(false);

  let person = searchParams.get("id");
  if (props.characterId) person = props.characterId;

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

  function getSpeciesLink(url: string, personUrl: string): string {
    const str = "/species?id=";
    try {
      let text = url.slice(0, url.length - 1);
      let id = text.slice(text.lastIndexOf("/") + 1);
      let person = personUrl.slice(0, personUrl.length -1);
      let personId = person.slice(person.lastIndexOf("/") +1);
      return str.concat(id).concat("&person=").concat(personId);
    } catch {
      return "/species";
    }
  }

  const getData = async () => {
    if (!props.character) {
      if (person)
        try {
          setIsLoading(true);
          const id = parseInt(person);
          const res = await swapiGetter("people", id.toString());
          setResponseSvc(res);
        } catch (e) {
          console.log(JSON.stringify(e));
        } finally {
          setIsLoading(false);
        }
    } else {
      setResponseSvc(props.character);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading)
    return <MyLoadingSpinner divHeight={600} loadingText="Beep, Beep BOOP!" />;

  if (responseSvc)
    return (
      <DocumentCard
        key={responseSvc.created}
        aria-label={"Star Wars Character:" + responseSvc.name}
        type={DocumentCardType.normal}
        styles={cardStyles}
      >
        <DocumentCardTitle
          title={responseSvc.name}
          className="App-DocCardTitle"
        />
        <DocumentCardDetails className="App-DocCardBody">
          <Label>Hair: {responseSvc.hair_color}</Label>
          <Label>Eyes: {responseSvc.eye_color}</Label>
          <Label>Skin: {responseSvc.skin_color}</Label>
          <Label>Height: {responseSvc.height}</Label>
          <Label>Weight: {responseSvc.mass}</Label>
          <Label>Gender: {responseSvc.gender}</Label>
          <SpeciesDisplay speciesUrl={responseSvc.species[0]}/>
          <FluentLink href={getHomeworldLink(responseSvc.homeworld)}>
            Visit {responseSvc.name}'s Homeworld
          </FluentLink>
        </DocumentCardDetails>
      </DocumentCard>
    );
  return <div>PersonDisplay</div>;
}
