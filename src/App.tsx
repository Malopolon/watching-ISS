import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import { Map } from "./components/Map/MapComponent";
import { TeamComponent } from "./components/TeamComponent/TeamComponent";

import "./App.css";

const App: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD47N3Qd5WGdXncwYPU_i9HJjNGjWpIfHw",
  });

  return (
    <div id="App" className="container">
      <div className="row">
        <div className="map-container col-12 col-lg-9">
          {isLoaded ? <Map></Map> : <h2>Loading</h2>}
        </div>
        <div className="team-container col-12 col-lg-3">
          <TeamComponent />
        </div>
      </div>
    </div>
  );
};
export default App;
