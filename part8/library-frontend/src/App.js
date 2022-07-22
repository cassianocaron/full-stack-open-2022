import { useState, useEffect } from "react";
import { useSubscription, useApolloClient } from "@apollo/client";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const userFromStorage = localStorage.getItem("library-user-token");
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      setMessage(`${addedBook.title} added`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Notify message={message} />
      <Authors show={page === "authors"} setError={setMessage} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} setError={setMessage} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={setMessage}
        setPage={setPage}
      />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
