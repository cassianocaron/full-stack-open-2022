import { useField } from "../hooks/index";
import { TextField, Button } from "@mui/material";

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form>
        <div>
          <TextField label="content" {...content} />
        </div>
        <div>
          <TextField label="author" {...author} />
        </div>
        <div>
          <TextField label="info" {...info} />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            create
          </Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateNew;
