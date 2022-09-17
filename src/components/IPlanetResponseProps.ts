import { SwapiPlanetsList } from "../models/swapiPlanets";

export interface IPlanetResponseProps{
    isLoading: boolean;
    search: string;
    responseSvc?: SwapiPlanetsList;
}