import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const authors = [
  { id: '1', name: 'Лев Толстой', birthYear: 1828 },
  { id: '2', name: 'Фёдор Достоевский', birthYear: 1821 },
];

const books = [
  { id: '1', title: 'Война и мир', authorId: '1', year: 1869, genre: 'Роман' },
  { id: '2', title: 'Анна Каренина', authorId: '1', year: 1877, genre: 'Роман' },
  { id: '3', title: 'Преступление и наказание', authorId: '2', year: 1866, genre: 'Роман' },
];

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    year: Int!
    genre: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    birthYear: Int!
    books: [Book!]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(name: String!, birthYear: Int!): Author!
    createBook(title: String!, authorId: ID!, year: Int!, genre: String!): Book!
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id),
    authors: () => authors,
    author: (_, { id }) => authors.find(author => author.id === id),
  },
  Mutation: {
    createAuthor: (_, { name, birthYear }) => {
      const author = { id: String(authors.length + 1), name, birthYear };
      authors.push(author);
      return author;
    },
    createBook: (_, { title, authorId, year, genre }) => {
      const book = { id: String(books.length + 1), title, authorId, year, genre };
      books.push(book);
      return book;
    },
  },
  Book: {
    author: (parent) => authors.find(author => author.id === parent.authorId),
  },
  Author: {
    books: (parent) => books.filter(book => book.authorId === parent.id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 GraphQL сервер запущен: ${url}`);