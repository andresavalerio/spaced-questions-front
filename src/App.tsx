import { UserProvider } from "providers/user/UserProvider";
import { useUserProvider } from "providers/user/hooks/UserHooks";
import { hasToken, isUserLogged } from "providers/user/utils/UserUtils";
import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </div>
  );
}

export const AppWrapper = () => {
  const {
    state,
    actions: { autoLogin },
  } = useUserProvider();

  const [loading, setLoading] = React.useState(hasToken());

  if (!isUserLogged(state) && hasToken())
    autoLogin().finally(() => {
      setLoading(false);
    });

  if (loading) return <h1>CARREGANDO</h1>;

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default App;
