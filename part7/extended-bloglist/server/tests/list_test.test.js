const listHelper = require("../utils/list_helper");
const { zeroBlogs, oneBlog, manyBlogs } = require("./blog_posts_helper");

test("dummy returns one", () => {
  const result = listHelper.dummy(zeroBlogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when list has no blogs, equals 0", () => {
    const result = listHelper.totalLikes(zeroBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(oneBlog);
    expect(result).toBe(7);
  });

  test("when list has many blogs, equals the sum of them all", () => {
    const result = listHelper.totalLikes(manyBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog", () => {
  test("when list has no blogs, equals to null", () => {
    const result = listHelper.favoriteBlog(zeroBlogs);
    expect(result).toBe(null);
  });

  test("when list has one blog, equals to that blog", () => {
    const result = listHelper.favoriteBlog(oneBlog);
    expect(result).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    });
  });

  test("when list has many blogs, equals to the most liked blog", () => {
    const result = listHelper.favoriteBlog(manyBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  test("when list has no blogs, equals to null", () => {
    const result = listHelper.mostBlogs(zeroBlogs);
    expect(result).toBe(null);
  });

  test("when list has one blog, equals to that blog", () => {
    const result = listHelper.mostBlogs(oneBlog);
    expect(result).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });
  });

  test("when list has many blogs, equals to Robert C. Martin", () => {
    const result = listHelper.mostBlogs(manyBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("when list has no blogs, equals to null", () => {
    const result = listHelper.mostLikes(zeroBlogs);
    expect(result).toBe(null);
  });

  test("when list has obe blog, equals to that blog", () => {
    const result = listHelper.mostLikes(oneBlog);
    expect(result).toEqual({
      author: "Michael Chan",
      likes: 7,
    });
  });

  test("when list has many blogs, equals to Edsger W. Dijkstra", () => {
    const result = listHelper.mostLikes(manyBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
