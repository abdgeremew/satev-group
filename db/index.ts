import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type CloudflareEnvModule = {
  env: {
    DB?: Parameters<typeof drizzle>[0];
  };
};

export async function getDb() {
  let env: CloudflareEnvModule["env"];

  try {
    // A literal dynamic import is understood by Cloudflare's bundler and does
    // not require eval/new Function, which is blocked in the local worker.
    // @ts-expect-error Provided by the Cloudflare Workers runtime.
    env = (await import("cloudflare:workers")).env as CloudflareEnvModule["env"];
  } catch {
    throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  }

  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Configure the DB binding before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}
