import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { schema } from "./schema";

function main() {
  const yoga = createYoga({ schema, graphqlEndpoint: "/" });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
