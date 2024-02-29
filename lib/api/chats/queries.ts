import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ChatId, chatIdSchema, chats } from "@/lib/db/schema/chats";

export const getChats = async () => {
  const rows = await db.select().from(chats);
  const c = rows
  return { chats: c };
};

export const getChatById = async (id: ChatId) => {
  const { id: chatId } = chatIdSchema.parse({ id });
  const [row] = await db.select().from(chats).where(eq(chats.id, chatId));
  if (row === undefined) return {};
  const c = row;
  return { chat: c };
};


export const getChatByUser = async (user_id:string) => {
  const rows = await db.select().from(chats).where(eq(chats.userId,user_id))
  if(rows===undefined) return {};
  const c = rows
  return { chat: c };
}