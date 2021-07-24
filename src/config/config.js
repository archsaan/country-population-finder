const DEFAULT_INPUT_DEBOUNCE = 200;
const MAX_RESULTS = 10;
const MAP_STYLE = "mapbox://styles/archanasaanz/ckrhei88i6alg19nzkinuunyp";

const defaultFuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 10,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  useExtendedSearch: true,
  keys: ["name"],
};

const chartOptions = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: false,
      text: "Population",
    },
  },
};

export {
  defaultFuseOptions,
  MAX_RESULTS,
  MAP_STYLE,
  DEFAULT_INPUT_DEBOUNCE,
  chartOptions,
};
