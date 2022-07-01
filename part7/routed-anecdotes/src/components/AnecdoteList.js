import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {anecdotes.map((anecdote) => (
            <TableRow key={anecdote.id}>
              <TableCell>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

export default AnecdoteList;
