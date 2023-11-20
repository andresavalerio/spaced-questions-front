import { fetchAPI } from "helpers/fetch";
import { GetCardsAPIResponse } from "../types";
import { CardsBedRequest, UserDontExistError } from "../erros";

export const requestCardFromUserNotebook = async (login: string, notebook: string | number) => {

    const response = await fetchAPI(`/user/cards/${login}/${notebook}`)

    if (response.status === 401) throw new UserDontExistError(
        `The user ${login} dosn't exist`
    );

    if (response.status === 400) throw new CardsBedRequest(
        `Bad Request`
    )

    return response.json() as unknown as GetCardsAPIResponse;

}