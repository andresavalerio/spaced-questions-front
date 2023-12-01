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

export const classifyRightOrWrongAnswer = async (
  owner: string,
  cardId: string,
  isAnswerRight: boolean
) => {

  const requestBody: RequestInit = {
    method: "POST",
    body: JSON.stringify({isAnswerRight})
  }

  const response = await fetchAPI(`/user/cards/${owner}/${cardId}`, requestBody);

  return 200;
};
