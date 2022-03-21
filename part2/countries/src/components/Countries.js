import CountryData from "./CountryData";

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length === 1) {
    return <CountryData country={countriesToShow[0]} />;
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        {countriesToShow.map((country) => (
          <div key={country.name.official}>{country.name.common}</div>
        ))}
      </div>
    );
  } else if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
};

export default Countries;
