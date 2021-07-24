import { useEffect, useContext } from "react";
import { CountriesContext } from "./contexts/CountriesContext";
//============ utilities ====================//
import { fetchCountryData } from "./api-utils";
//============ Components ====================//
import Map from "./components/Map";
import Chart from "./components/Chart";
import Search from "./components/Search";

const App = () => {
  const { setAllCountryData } = useContext(CountriesContext);

  useEffect(() => {
    //===== API request for all countries is sent ==========//
    (async () => {
      const data = await fetchCountryData();
      const dataRemapped = data.map((item, idx) => ({
        ...item,
        id: item.numericCode,
      }));
      setAllCountryData(dataRemapped);
    })();
  }, []);

  return (
    <div className="flex-container">
      <div>
        <Search />
      </div>
      <div>
        <Map />
        <Chart />
      </div>
    </div>
  );
};

export default App;
