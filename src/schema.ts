import { makeExecutableSchema } from '@graphql-tools/schema';
import gql from 'graphql-tag';
const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});