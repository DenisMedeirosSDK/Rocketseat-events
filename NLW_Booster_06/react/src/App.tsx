import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthContextProvider } from "./contetxs/AuthContext";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route component={Home} exact path="/" />
        <Route component={NewRoom} exact path="/room/new" />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
