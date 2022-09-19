import { Label } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SwapiSpecies } from "../models/swapiSpecies";
import swapiGetter from "../services/swapiGetter";
import { ISpeciesDisplayProps } from "./ISpeciesDisplayProps";
import MyLoadingSpinner from "./MyLoadingSpinner";

export default function SpeciesDisplay(props: ISpeciesDisplayProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [responseSvc, setResponseSvc] = useState<SwapiSpecies>();
  const [isLoading, setIsLoading] = useState(false);

  let iD = searchParams.get("id");
  if (props.speciesUrl) iD = getSpeciesId(props.speciesUrl);

  const getData = async () => {
    if (iD)
      try {
        setIsLoading(true);
        const id = parseInt(iD);
        const res = await swapiGetter("species", id.toString());
        setResponseSvc(res);
      } catch (e) {
        console.log(JSON.stringify(e));
      } finally {
        setIsLoading(false);
        console.log(JSON.stringify(responseSvc));
      }
  };

  useEffect(() => {
    getData();
  }, []);

  function getSpeciesId(url: string): string {
    console.log("Species Url " + url);
    try {
      let text = url.slice(0, url.length - 1);
      let id = text.slice(text.lastIndexOf("/") + 1);
      return id;
    } catch {
      return "1";
    }
  }

  if (isLoading)
    return <MyLoadingSpinner divHeight={30} loadingText="Scanning lifeform" />;

  if (responseSvc)
    return (
      <>
        <Label>Species: {responseSvc.name}</Label>
        <Label>Language: {responseSvc.language}</Label>
      </>
    );

  return (
    <>
      <div>
        Species Not Found!
      </div>
    </>
  );
}
