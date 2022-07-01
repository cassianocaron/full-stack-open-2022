import { useSelector } from "react-redux";
import { orderBy } from "lodash";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const sortedBlogs = orderBy(blogs, ["likes"], ["desc"]);

  return (
    <div>
      <h2>Blogs</h2>
      <TableContainer id="bloglist" component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} - {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
