import { fetchAPI } from "helpers/fetch";
import { GetCardsAPIResponse } from "../types";

export const requestCardFromUserNotebook = async (login: string, notebook: string) => {

    const response = await fetchAPI(`/user/cards/${login}/${notebook}`)

    return response.json() as unknown as GetCardsAPIResponse;

}