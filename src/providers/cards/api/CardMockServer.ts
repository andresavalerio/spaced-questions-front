import { rest } from "msw";
import { buildEndpointPath } from "helpers/api";
import { CardModel, GetCardsAPIResponse } from "../types";

const getCardsEndpoint = buildEndpointPath("/user/cards/:owner/:notebook");

const getCardsHandler = rest.get(getCardsEndpoint, async (req, res, ctx) => {
  const user = req.params["owner"];
  const notebook = req.params["notebook"];

  if (user.includes('joe doe'))
    return res(ctx.delay(), ctx.status(401));  
  
    const responseCards = (() => {
      const cards: CardModel[] = [];
      for (let i = 0; i < 10; i++)
        cards.push(new CardModel(i.toString(), (i + 1).toString()));
      return cards;
    })();

  return res(
    ctx.delay(),
    ctx.status(200),
    ctx.json({
      notebook: notebook,
      cards: responseCards,
    } as GetCardsAPIResponse)
  );
});

export const cardHandler = [getCardsHandler];
