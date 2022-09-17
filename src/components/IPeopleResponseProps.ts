import { SwapiPeopleList } from "../models/swapiPeople";

export interface IPeopleResponseProps{
    isLoading: boolean;
    search: string;
    responseSvc?: SwapiPeopleList;
}