const User = ({ user }) => {
  const { name, blogs } = user;

  return (
    <div>
      <h2>{name}</h2>
      {blogs.length > 0 ? (
        <div>
          <p>
            <strong>added blogs</strong>
          </p>
          <ul>
            {blogs.map((blog) => (
              <li key={blog.title}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>no blogs yet...</p>
      )}
    </div>
  );
};

export default User;
