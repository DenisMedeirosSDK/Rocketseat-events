import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { AdminRoom } from "./pages/AdminRoom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={NewRoom} path="/rooms/new" />
          <Route component={Room} path="/rooms/:id" />
          <Route component={AdminRoom} path="/admin/rooms/:id" />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
