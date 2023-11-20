import { rest } from "msw";
import { buildEndpointPath } from "helpers/api";
import { Card, GetCardsAPIResponse } from "../types";

const getCardsEndpoint = buildEndpointPath("/user/cards/:owner/:notebook");

const requestCardModificationEndpoint = buildEndpointPath(
  "/user/cards/:owner/:cardId"
);

const getCardsHandler = rest.get(getCardsEndpoint, async (req, res, ctx) => {
  const user = req.params["owner"];
  const notebook = req.params["notebook"];

  if (user.includes("joe doe")) return res(ctx.delay(), ctx.status(401));

  if (notebook.includes("none")) return res(ctx.delay(), ctx.status(400));
  const responseCards = (() => {
    const cards: Card[] = [];
    for (let i = 0; i < 10; i++)
      cards.push({
        question: i.toString(),
        answer: (i + 1).toString(),
      } as Card);
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

const requestCardAlteraionHandler = rest.patch(
  requestCardModificationEndpoint,
  async (req, res, ctx) => {
    return res(ctx.delay(), ctx.status(200));
  }
);

export const cardHandlers = [getCardsHandler, requestCardAlteraionHandler];
