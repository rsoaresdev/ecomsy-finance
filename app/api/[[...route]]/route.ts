import { Hono } from "hono";
import { handle } from "hono/vercel";

import plaid from "./plaid";
import summary from "./summary";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import subscriptions from "./subscriptions";

const app = new Hono().basePath("/api");

// CORS
app.use("*", (c, next) => {
  c.res.headers.append("Access-Control-Allow-Origin", "*");
  c.res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  c.res.headers.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return next();
});

const routes = app
  .route("/plaid", plaid)
  .route("/summary", summary)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/subscriptions", subscriptions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
