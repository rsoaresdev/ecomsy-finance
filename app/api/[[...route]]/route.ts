import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

import plaid from "./plaid";
import summary from "./summary";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import subscriptions from "./subscriptions";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use("*", async (c, next) => {
  const corsMiddleware = cors({
    origin: "https://www.ecomsy.site",
    allowHeaders: ["Origin", "Content-Type", "Authorization"],
    allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
    credentials: true,
  });
  await corsMiddleware(c, next);
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
