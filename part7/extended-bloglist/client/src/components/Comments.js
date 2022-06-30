import { useField } from "../hooks/index";
import { createComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { Button, Grid, TextField } from "@mui/material";

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const { reset: resetComment, ...comment } = useField("text");

  const { id, comments } = blog;

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createComment(id, comment.value));
    resetComment();
  };

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item>
            <TextField label="write your thoughts" size="small" {...comment} />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Button variant="contained" color="primary" type="submit">
              add comment
            </Button>
          </Grid>
        </Grid>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments yet...</p>
      )}
    </div>
  );
};

export default Comments;
