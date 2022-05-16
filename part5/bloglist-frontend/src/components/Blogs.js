const Blogs = ({ blogs }) => (
  <table>
    <tbody>
      <tr>
        <th>Title</th>
        <th>Author</th>
      </tr>
      {blogs.map((blog) => (
        <tr key={blog.id}>
          <td>{blog.title}</td>
          <td>{blog.author}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Blogs;
