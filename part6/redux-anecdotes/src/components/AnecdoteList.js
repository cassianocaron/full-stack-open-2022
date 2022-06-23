import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { orderBy } from "lodash";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(createNotification(`You voted '${anecdote.content}'`, 5));
  };

  const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

  return sortedAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
