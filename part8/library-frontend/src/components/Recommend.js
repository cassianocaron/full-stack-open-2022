import { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { USER, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const user = useQuery(USER);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user.data) {
      setFavoriteGenre(user?.data?.me?.favoriteGenre);
      getBooks({ variables: { genre: favoriteGenre } });
    }
  }, [user.data, favoriteGenre, getBooks]);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  if (result.loading || user.loading) {
    return <p>Loading...</p>;
  }

  if (result.error || user.error) {
    return <p>Error :(</p>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      {books.length > 0 ? (
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
              {books.map((book, i) => (
                <tr key={i}>
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
