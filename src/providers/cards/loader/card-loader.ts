import { requestCardFromUserNotebook } from "../api/CardAPI";
import { Card } from "../types";

const cacheCards: Card[] = [];

export const interval: { abort: NodeJS.Timeout | undefined; time: number } = {
  time: 0,
  abort: undefined,
};

export const cardLoader = async () => {
  try {
    const needReload = interval.time > 15;

    console.log(interval.time);

    if (!needReload && cacheCards.length > 0) {
      console.log("cache");

      return cacheCards;
    }

    if (interval.abort) {
      clearInterval(interval.abort);

      interval.time = 0;

      interval.abort = undefined;
    }

    const response = await requestCardFromUserNotebook("pedro", "testes");

    cacheCards.push(...response.cards);

    console.log("response");

    if (!interval.abort)
      interval.abort = setInterval(() => {
        interval.time++;
        console.log(interval.time);
      }, 1000);

    return response.cards;
  } catch (error) {
    console.error(error);

    return [];
  }
};
