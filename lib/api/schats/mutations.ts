import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  SchatId, 
  NewSchatParams,
  UpdateSchatParams, 
  updateSchatSchema,
  insertSchatSchema, 
  schats,
  schatIdSchema 
} from "@/lib/db/schema/schats";

export const createSchat = async (schat: NewSchatParams) => {
  const newSchat = insertSchatSchema.parse(schat);
  try {
    const [s] =  await db.insert(schats).values(newSchat).returning();
    return { schat: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSchat = async (id: SchatId, schat: UpdateSchatParams) => {
  const { id: schatId } = schatIdSchema.parse({ id });
  const newSchat = updateSchatSchema.parse(schat);
  try {
    const [s] =  await db
     .update(schats)
     .set({...newSchat, updatedAt: new Date().toISOString().slice(0, 19).replace("T", " ") })
     .where(eq(schats.id, schatId!))
     .returning();
    return { schat: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSchat = async (id: SchatId) => {
  const { id: schatId } = schatIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(schats).where(eq(schats.id, schatId!))
    .returning();
    return { schat: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

