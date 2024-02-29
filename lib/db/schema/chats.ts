import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getChats } from "@/lib/api/chats/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const chats = sqliteTable('chats', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  userId: text("user_id").notNull(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for chats - used to validate API requests
const baseSchema = createSelectSchema(chats).omit(timestamps)

export const insertChatSchema = createInsertSchema(chats).omit(timestamps);
export const insertChatParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateChatSchema = baseSchema;
export const updateChatParams = baseSchema.extend({})
export const chatIdSchema = baseSchema.pick({ id: true });

// Types for chats - used to type API request params and within Components
export type Chat = typeof chats.$inferSelect;
export type NewChat = z.infer<typeof insertChatSchema>;
export type NewChatParams = z.infer<typeof insertChatParams>;
export type UpdateChatParams = z.infer<typeof updateChatParams>;
export type ChatId = z.infer<typeof chatIdSchema>["id"];
    
// this type infers the return from getChats() - meaning it will include any joins
export type CompleteChat = Awaited<ReturnType<typeof getChats>>["chats"][number];

