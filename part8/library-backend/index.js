require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const Author = require("./models/author");
const Book = require("./models/book");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    // allBooks: async (root, args) => {
    //   if (args.author && args.genre) {
    //     return books.filter(
    //       (book) =>
    //         book.author === args.author && book.genres.includes(args.genre)
    //     );
    //   }
    //   if (args.author) {
    //     return books.filter((book) => book.author === args.author);
    //   }
    //   if (args.genre) {
    //     return books.filter((book) => book.genres.includes(args.genre));
    //   }
    //   return books;
    // },
  },
  // Author: {
  //   bookCount: (root) =>
  //     books.filter((book) => book.author === root.name).length,
  // },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author: author.id });
      return book.save();
    },
    // editAuthor: (root, args) => {
    //   const author = authors.find((author) => author.name === args.name);
    //   if (!author) return null;

    //   const updatedAuthor = { ...author, born: args.setBornTo };
    //   authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
    //   return updatedAuthor;
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
