import React, { useEffect } from "react";
import { userReducer } from "./reducer/UserReducer";
import { UserReducers, UserState } from "./types";
import { isDevelopment } from "config";
import { userServer } from "./api/UserMockServer";

const initialState: UserState = { loading: false };

export const UserContext = React.createContext<UserState>(initialState);

export const UserDispatchContext =
  React.createContext<React.Dispatch<UserReducers> | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, dispatch] = React.useReducer(userReducer, initialState);

  useEffect(() => {
    if (isDevelopment) userServer.listen();

    return () => {
      if (isDevelopment) userServer.close();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
