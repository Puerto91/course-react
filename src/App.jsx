import React from "react";
import "./App.scss";

import StoreProvider from "./store/StoreProvider";
import Header from "./components/Header/Header";

function App() {
  return (
    <StoreProvider>
      <Header />
    </StoreProvider>
  );
}

export default App;
