import { useContext, useMemo } from "react";
import { CountriesContext } from "../contexts/CountriesContext";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { MAP_STYLE } from "../config/config";

const Map = () => {
  const {
    filteredCountries,
    viewport,
    setViewPort,
    selectedCountry,
    setSelectedCountry,
  } = useContext(CountriesContext);

  //=============================== Generating markers for filtered countries =====================//
  const markers = useMemo(
    () =>
      filteredCountries.map(
        (country) =>
          country.latlng.length > 0 && (
            <Marker
              key={country.numericCode}
              longitude={country.latlng[1]}
              latitude={country.latlng[0]}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCountry(country);
                }}
              >
                <img className="marker-pin" src="pin.png" alt="marker" />
              </button>
            </Marker>
          )
      ),
    [filteredCountries]
  );
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={MAP_STYLE}
      width="90vw"
      height="60vh"
      onViewportChange={(viewport) => setViewPort(viewport)}
    >
      {filteredCountries.length > 0 && markers}
      {selectedCountry && (
        <Popup
          longitude={selectedCountry.latlng[1]}
          latitude={selectedCountry.latlng[0]}
          onClose={() => {
            setSelectedCountry(null);
          }}
        >
          <div>
            <p>{selectedCountry.name}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
