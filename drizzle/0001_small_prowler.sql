DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('VERIFICATION', 'PASSWORD_RESET', 'TWO_FACTOR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "token" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"role" "type" NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
DROP TABLE "password_reset_token";--> statement-breakpoint
DROP TABLE "two_factor_token";--> statement-breakpoint
DROP TABLE "verification_token";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "token" ADD CONSTRAINT "token_email_user_email_fk" FOREIGN KEY ("email") REFERENCES "user"("email") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
