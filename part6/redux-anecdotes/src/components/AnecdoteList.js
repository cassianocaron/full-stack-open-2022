import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { orderBy } from "lodash";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
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
