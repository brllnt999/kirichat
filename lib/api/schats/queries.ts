import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SchatId, schatIdSchema, schats } from "@/lib/db/schema/schats";

export const getSchats = async () => {
  const rows = await db.select().from(schats);
  const s = rows
  return { schats: s };
};

export const getSchatById = async (id: SchatId) => {
  const { id: schatId } = schatIdSchema.parse({ id });
  const [row] = await db.select().from(schats).where(eq(schats.id, schatId));
  if (row === undefined) return {};
  const s = row;
  return { schat: s };
};


