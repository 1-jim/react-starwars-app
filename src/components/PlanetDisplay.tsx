import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import swapiGetter from "../services/swapiGetter";
import { SwapiPlanetsList } from "../models/swapiPlanets";
import { MessageBar, MessageBarType } from "@fluentui/react";
import MyLoadingSpinner from "./MyLoadingSpinner";

export default function PlanetDisplay() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<unknown>();
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);
  const [responseSvc, setResponseSvc] = useState<SwapiPlanetsList>();

  const getData = async () => {
    const iD = searchParams.get("id");
    console.log("Query String ID: " + iD);
    if (iD) {
      setIsLoadingSvc(true);
      try {
        const res = await swapiGetter("planets", iD);
        setResponseSvc(res);
      } catch (e) {
        console.error(JSON.stringify(e));
        setError(e);
      } finally {
        setIsLoadingSvc(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  if (isLoadingSvc)
    return <MyLoadingSpinner divHeight={300} loadingText="Scanning Planet" />;

  if (responseSvc !== undefined)
    return <div>{JSON.stringify(responseSvc)}</div>;

  return <div>PlanetDisplay</div>;
}
