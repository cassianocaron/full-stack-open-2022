import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { orderBy } from "lodash";
import {
  setNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleAddVote = (id) => {
    dispatch(addVote(id));
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(setNotification(`You voted for ${anecdote.content}`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

  return sortedAnecdotes
    .filter((anecdote) => anecdote.content.includes(filter))
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleAddVote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
