import React, { createContext, useState } from "react";

export const CountriesContext = createContext();

const CountriesProvider = (props) => {
  const initialViewPort = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 2,
  };

  const [allCountryData, setAllCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dataChart, setDataChart] = useState({});
  const [viewport, setViewPort] = useState(initialViewPort);
  const [searchValue, setSearchValue] = useState("");

  return (
    <CountriesContext.Provider
      value={{
        allCountryData,
        setAllCountryData,
        filteredCountries,
        setFilteredCountries,
        viewport,
        setViewPort,
        selectedCountry,
        setSelectedCountry,
        dataChart,
        setDataChart,
        searchValue,
        setSearchValue,
      }}
    >
      {props.children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
