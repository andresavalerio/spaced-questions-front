import { fetchAPI } from "helpers/fetch";
import { GetCardsAPIResponse } from "../types";
import { CardsBadRequest, UserDontExistError } from "../erros";

export const requestCardFromUserNotebook = async (
  owner: string,
  notebook: string
) => {
  const response = await fetchAPI(`/user/cards/${owner}/${notebook}`);

  if (response.status === 401)
    throw new UserDontExistError(`The user ${owner} dosn't exist`);

  if (response.status === 400) throw new CardsBadRequest(`Bad Request`);

  return response.json() as unknown as GetCardsAPIResponse;
};
