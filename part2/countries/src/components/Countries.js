const Countries = ({ countriesToShow, setCountriesToShow }) => {
  if (countriesToShow.length === 1) return null;

  return countriesToShow.map((country) => (
    <div key={country.name.official}>
      {country.name.common}{" "}
      <button onClick={() => setCountriesToShow([country])}>show</button>
    </div>
  ));
};

export default Countries;
