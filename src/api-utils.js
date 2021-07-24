//Function for fetching country data from API
export const fetchCountryData = async () => {
  const url =
    "https://restcountries.eu/rest/v2/all?fields=name;population;latlng;region;numericCode";
  const response = await fetch(url);
  if (response.status >= 200 && response.status <= 299) {
    const data = await response.json();
    return data;
  } else {
    // If no response, handle error
    console.log(response.status, response.statusText);
  }
};
