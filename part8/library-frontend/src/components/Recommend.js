import { useQuery } from "@apollo/client";
import { USER, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const user = useQuery(USER);
  const books = useQuery(ALL_BOOKS);

  if (!props.show || !user.data || !books.data) {
    return null;
  }

  if (user.loading || books.loading) {
    return <p>Loading...</p>;
  }

  if (user.error || books.error) {
    return <p>Something went wrong</p>;
  }

  const favoriteGenre = user?.data?.me?.favoriteGenre;

  const bookRecommendations = books.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      {bookRecommendations.length > 0 ? (
        <div>
          <p>
            Books in your favorite genre <strong>{favoriteGenre}</strong>
          </p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {bookRecommendations.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>
          No books have been added yet based on your favorite genre{" "}
          <strong>{favoriteGenre}</strong>
        </p>
      )}
    </div>
  );
};

export default Recommend;
