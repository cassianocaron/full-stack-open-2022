const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);

  // const passwordHash = await bcrypt.hash("password", 10);
  // const user = new User({ username, name, passwordHash });

  // await user.save();
});

describe("when there is initially one user saved", () => {
  test("user is returned", async () => {
    const usersAtStart = await helper.usersInDb();

    expect(usersAtStart[0].username).toBe("hellas");
  });

  test("creation fails if username is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "name",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username and password are required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "name",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username and password are required");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if username is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "aa",
      name: "name",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if password is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "aaasdsad",
      name: "name",
      password: "pa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username and password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

// test("creation fails with proper statuscode and message if username is too short", async () => {
//   const usersAtStart = await helper.usersInDb();

//   const newUser = {
//     username: "Jo",
//     name: "New Name",
//     password: "password",
//   };

//   const result = await api
//     .post("/api/users")
//     .send(newUser)
//     .expect(400)
//     .expect("Content-Type", /application\/json/);

//   expect(result.body.error).toContain(
//     "`username` (`Jo`) is shorter than the minimum allowed length (3)."
//   );

//   const usersAtEnd = await helper.usersInDb();
//   expect(usersAtEnd).toHaveLength(usersAtStart.length);
// });

// test("creation fails with proper statuscode and message if passwird is missing", async () => {
//   const usersAtStart = await helper.usersInDb();

//   const newUser = {
//     username: "John",
//     name: "New Name",
//   };

//   const result = await api
//     .post("/api/users")
//     .send(newUser)
//     .expect(400)
//     .expect("Content-Type", /application\/json/);

//   expect(result.body.error).toContain("password is required");

//   const usersAtEnd = await helper.usersInDb();
//   expect(usersAtEnd).toHaveLength(usersAtStart.length);
// });

// test("creation fails with proper statuscode and message if passwird is missing", async () => {
//   const usersAtStart = await helper.usersInDb();

//   const newUser = {
//     username: "John",
//     name: "New Name",
//     password: "p",
//   };

//   const result = await api
//     .post("/api/users")
//     .send(newUser)
//     .expect(400)
//     .expect("Content-Type", /application\/json/);

//   expect(result.body.error).toContain(
//     "password should be at least 3 characters"
//   );

//   const usersAtEnd = await helper.usersInDb();
//   expect(usersAtEnd).toHaveLength(usersAtStart.length);
// });

afterAll(() => {
  mongoose.connection.close();
});
