import { UserProvider } from "providers/user/UserProvider";
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

export default App;
