import { rest } from "msw";
import { buildEndpointPath } from "helpers/api";
import { Card, GetCardsAPIResponse } from "../types";

const getCardsEndpoint = buildEndpointPath("/user/cards/:owner/:notebook");

const generateCards = (length: number) => {
  const cards: Card[] = [];

  for (let index = 0; index < length; index++) {
    const newCard = {
      question: index.toString(),
      answer: (index + 1).toString(),
    };

    cards.push(newCard);
  }

  return cards;
};

const getCardsHandler = rest.get(getCardsEndpoint, async (req, res, ctx) => {
  const user = req.params["owner"];
  const notebook = req.params["notebook"];

  const isUnathourized = user.includes("joe doe");

  if (isUnathourized) return res(ctx.delay(), ctx.status(401));

  const isBadRequest = notebook.includes("none");

  if (isBadRequest) return res(ctx.delay(), ctx.status(400));

  const responseCards = generateCards(10);

  return res(
    ctx.delay(),
    ctx.status(200),
    ctx.json(responseCards as GetCardsAPIResponse)
  );
});

export const cardHandlers = [getCardsHandler];
