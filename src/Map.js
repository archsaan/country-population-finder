import { useState } from "react";
import ReactMapGL from "react-map-gl";

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/archanasaanz/ckr96sfti39d018qi6jolglcc"
      width="100vw"
      height="100vh"
      onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
}

export default Map;
