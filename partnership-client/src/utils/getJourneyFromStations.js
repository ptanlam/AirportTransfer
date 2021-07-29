export default function getPlaceFromDescription(stations) {
  const journey = stations
    .map((station) => station.description.split(',')[0])
    .join(' 🚌 ');
  return journey;
}
