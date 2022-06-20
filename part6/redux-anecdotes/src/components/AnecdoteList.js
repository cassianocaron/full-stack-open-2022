import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { orderBy } from "lodash";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const handleAddVote = (id) => {
    dispatch(addVote(id));
  };

  const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"]);

  return sortedAnecdotes.map((anecdote) => (
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
