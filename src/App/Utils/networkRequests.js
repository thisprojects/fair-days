const fetchCoords = location => {
  return (
    fetch(
      "https://us-central1-nathan-downes-express-api.cloudfunctions.net/api/maps",
      { method: "POST", body: `${ location }` }
    )
      .then(r => r.json())
      // return search locations lat and lng and formatted address.
      .then(r => ({
        coords: r.results[0].geometry.location,
        address: r.results[0]["formatted_address"]
      }))
  );
};

const fetchWeather = ({ lat, lng }) => {
  return (
    fetch(
      "https://europe-west1-my-project-1501505786926.cloudfunctions.net/get-weather",
      { method: "POST", body: `${ lat },${ lng }` }
    )
      .then(r => r.json())
      // return daily forcasts
      .then(r => ({ daily: r.daily }))
  );
};

const getData = async location => {
  const { coords, address } = await fetchCoords(location);
  const { daily: { data } = {} } = await fetchWeather(coords);
  return { address, forcasts: data };
};

export default getData;
