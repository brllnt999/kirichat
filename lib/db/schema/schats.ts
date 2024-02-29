import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getSchats } from "@/lib/api/schats/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const schats = sqliteTable('schats', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull(),
  threadId: text("thread_id").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for schats - used to validate API requests
const baseSchema = createSelectSchema(schats).omit(timestamps)

export const insertSchatSchema = createInsertSchema(schats).omit(timestamps);
export const insertSchatParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateSchatSchema = baseSchema;
export const updateSchatParams = baseSchema.extend({})
export const schatIdSchema = baseSchema.pick({ id: true });

// Types for schats - used to type API request params and within Components
export type Schat = typeof schats.$inferSelect;
export type NewSchat = z.infer<typeof insertSchatSchema>;
export type NewSchatParams = z.infer<typeof insertSchatParams>;
export type UpdateSchatParams = z.infer<typeof updateSchatParams>;
export type SchatId = z.infer<typeof schatIdSchema>["id"];
    
// this type infers the return from getSchats() - meaning it will include any joins
export type CompleteSchat = Awaited<ReturnType<typeof getSchats>>["schats"][number];

