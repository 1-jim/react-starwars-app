import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SwapiSpecies } from "../models/swapiSpecies";
import swapiGetter from "../services/swapiGetter";
import PersonDisplay from "./PersonDisplay";

export default function SpeciesDisplay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [responseSvc, setResponseSvc] = useState<SwapiSpecies>();
  const [isLoading, setIsLoading] = useState(false);
  const iD = searchParams.get("id");
  const person = searchParams.get("person");
  console.log("Query String ID: " + iD);
  console.log("Query String Person: " + person);

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

  if (responseSvc)
    return (
      <>
        <div>SpeciesDisplay {iD}</div>
        <ul>
          <li>{responseSvc.name}</li>
        </ul>
        {person ? <PersonDisplay characterId={person} /> : null}
      </>
    );

  return (
    <>
      <div>
        <ul>
          <li>stuff</li>
          <li>things</li>
        </ul>
      </div>
    </>
  );
}
