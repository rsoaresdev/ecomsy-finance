import { Hono } from "hono";
import { handle } from "hono/vercel";

import plaid from "./plaid";
import summary from "./summary";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import subscriptions from "./subscriptions";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { main as seedDatabase } from "@/scripts/seed"; // Importando a função main do seed.ts

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
  .route("/subscriptions", subscriptions)
  .get("/seed", clerkMiddleware(), async (c) => {
    console.log("entrei");
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      await seedDatabase(); // Chamando a função de seed
      return c.json({ status: "ok" });
    } catch (error) {
      console.error("Error during seeding:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  });

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
