import { useContext } from "react";
import { CountriesContext } from "../contexts/CountriesContext";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Fuse from "fuse.js";
import {
  defaultFuseOptions,
  MAX_RESULTS,
  DEFAULT_INPUT_DEBOUNCE,
} from "../config/config";

const Search = () => {
  const {
    allCountryData,
    setFilteredCountries,
    setViewPort,
    setDataChart,
    searchValue,
    setSearchValue,
  } = useContext(CountriesContext);

  const fuse = new Fuse(allCountryData, defaultFuseOptions);

  // =================this function will trigger on typing =================//
  const handleOnSearch = (string, results) => {
    setSearchValue(string);
  };
  //================= callback function on selecting an option ==============//
  const handleOnSelect = (item) => {
    const foundCountries = fuse
      .search(`=${item.name}`)
      .map((result) => ({ ...result.item }));

    setFilteredCountries(foundCountries);

    //setting the new map viewport based on search results
    resetViewPort(foundCountries);
    //setting the new graph based on search results
    drawGraph(foundCountries);
  };

  const resetViewPort = (foundCountries) => {
    {
      foundCountries.length > 0 &&
        setViewPort({
          latitude: foundCountries[0].latlng[0],
          longitude: foundCountries[0].latlng[1],
          zoom: 2,
        });
    }
  };

  const drawGraph = (foundCountries) => {
    const countrynames = foundCountries.map((item) => item.name);
    const countryData = foundCountries.map((item) => item.population);
    //building chart object
    const chartObj = {
      labels: countrynames,
      datasets: [
        {
          label: "Total population",
          data: countryData,
          borderWidth: 1,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };
    //updating the chart values
    setDataChart(chartObj);
  };
  //================== Function will clear the search text ====================================//
  const handleOnClear = () => {
    setFilteredCountries([]);
    setDataChart({});
  };
  //================== Function will search based on keyword ====================================//
  const handleBtnSearch = () => {
    /*===========================================================================================
    // Searching countries based on keyword(sometimes partial). function will return the top 10 results
    //To get a result for partial serach enter upto 5 letters
    ==============================================================================================*/
    const searchResult = fuse
      .search(`^${searchValue}|'${searchValue}`, { limit: MAX_RESULTS })
      .map((result) => ({ ...result.item }))
      .slice(0, MAX_RESULTS);
    //setting the new graph based on search results
    setFilteredCountries(searchResult);
    //setting the new map viewport based on search results
    resetViewPort(searchResult);
    //drawing the new graph based on new search results
    drawGraph(searchResult);
  };
  return (
    <div className="flex-container-search">
      <div style={{ width: 200, margin: 20 }}>
        <ReactSearchAutocomplete
          items={allCountryData}
          autoFocus
          showIcon={false}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          onClear={handleOnClear}
          inputDebounce={DEFAULT_INPUT_DEBOUNCE}
          placeholder="Search a country"
          fuseOptions={{ minMatchCharLength: 1 }}
          styling={{
            zIndex: 1,
          }}
        />
      </div>
      <div>
        <button className="btn" onClick={handleBtnSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
