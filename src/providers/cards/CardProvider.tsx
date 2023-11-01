import React from "react";
import { cardsReducer } from "./reducer/UserReduce";
import { CardState, CardsReducer } from "./types";

const initialState: CardState = {loading: false};

export const CardContext = React.createContext<CardState>(initialState);

export const CardDispatchContext = React.createContext<React.Dispatch<CardsReducer> | null>(null);

export function CardProvider({children} : { children: React.ReactNode }){

    const [card, dispatch] = React.useReducer(cardsReducer, initialState)

    return (
        <CardContext.Provider value = {card}>
            <CardDispatchContext.Provider value={dispatch}>
                {children}
            </CardDispatchContext.Provider>
        </CardContext.Provider>
    )
}