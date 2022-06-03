import { useSelector, useDispatch } from "react-redux";
import { addVote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddVote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleAddVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
