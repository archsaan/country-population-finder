import React from "react";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { CountriesContext } from "../contexts/CountriesContext";
import { chartOptions } from "../config/config";

const Chart = () => {
  const { dataChart } = useContext(CountriesContext);
  return (
    <div>{dataChart && <Bar data={dataChart} options={chartOptions} />}</div>
  );
};

export default Chart;
