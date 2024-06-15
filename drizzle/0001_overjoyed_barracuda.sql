CREATE TABLE IF NOT EXISTS "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plaid_id" text,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "categories_id_unique" UNIQUE("id")
);
