import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

function main() {
  const app = express();
  const yoga = createYoga({ schema });
  app.use("/graphql", yoga);
  app.get("/", (req, res) => {
    res.redirect("/graphql");
  });
  app.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
