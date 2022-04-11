const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const mostLiked = blogs.reduce((prev, curr) => {
    return prev.likes > curr.likes ? prev : curr;
  });

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog };
