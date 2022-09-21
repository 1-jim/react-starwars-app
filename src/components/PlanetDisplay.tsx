import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import swapiGetter from "../services/swapiGetter";
import { SwapiPlanet } from "../models/swapiPlanets";
import { Label, MessageBar, MessageBarType } from "@fluentui/react";
import MyLoadingSpinner from "./MyLoadingSpinner";
import { IPlanetDisplayProps } from "./IPlanetDisplayProps";

export default function PlanetDisplay(props: IPlanetDisplayProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<unknown>();
  const [isLoadingSvc, setIsLoadingSvc] = useState(false);
  const [responseSvc, setResponseSvc] = useState<SwapiPlanet>();

  function getPlanetId(url: string): string {
    console.log("Planet Url " + url);
    try {
      let text = url.slice(0, url.length - 1);
      let id = text.slice(text.lastIndexOf("/") + 1);
      return id;
    } catch {
      return "1";
    }
  }

  /**
   * Convert an integer to its words representation
   *
   * @author McShaman (http://stackoverflow.com/users/788657/mcshaman)
   * @source http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
   */
  function numberToEnglish(n: any, custom_join_character: string) {
    var string = n.toString(),
      units,
      tens,
      scales,
      start,
      end,
      chunks,
      chunksLen,
      chunk,
      ints,
      i,
      word,
      words;

    var and = custom_join_character || "and";

    /* Is number zero? */
    if (parseInt(string) === 0) {
      return "zero";
    }

    /* Array of units as words */
    units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    /* Array of tens as words */
    tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    /* Array of scales as words */
    scales = [
      "",
      "thousand",
      "million",
      "billion",
      "trillion",
      "quadrillion",
      "quintillion",
      "sextillion",
      "septillion",
      "octillion",
      "nonillion",
      "decillion",
      "undecillion",
      "duodecillion",
      "tredecillion",
      "quatttuor-decillion",
      "quindecillion",
      "sexdecillion",
      "septen-decillion",
      "octodecillion",
      "novemdecillion",
      "vigintillion",
      "centillion",
    ];

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return "";
    }

    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);

      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i].split("").reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {
          /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
          if (ints[2] || (!i && chunksLen)) {
            words.push(and);
          }
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + " hundred");
        }
      }
    }

    return words.reverse().join(" ");
  }

  function formatPopulation(value: string): string {
    const population = parseInt(value);
    if (population) return numberToEnglish(value, ',');
    return population.toLocaleString("en-GB");
  }

  const getData = async () => {
    const iD = getPlanetId(props.planetUrl);
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
    return (
      <>
        <Label>{responseSvc.name} has a population of</Label>
        <Label>{formatPopulation(responseSvc.population)}</Label>
      </>
    );

  return <div>No Planet info!</div>;
}
