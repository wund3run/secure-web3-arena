
import React from "react";
import { AppProviders } from "./components/app/AppProviders";
import { GlobalComponents } from "./components/app/GlobalComponents";
import { AppRoutes } from "./components/app/AppRoutes";
import { AppInitializer } from "./components/app/AppInitializer";

function App() {
  return (
    <AppInitializer>
      <AppProviders>
        <div className="app">
          <GlobalComponents />
          <AppRoutes />
        </div>
      </AppProviders>
    </AppInitializer>
  );
}

export default App;
