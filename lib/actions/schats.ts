"use server";

import { revalidatePath } from "next/cache";
import {
  createSchat,
  deleteSchat,
  updateSchat,
} from "@/lib/api/schats/mutations";
import {
  SchatId,
  NewSchatParams,
  UpdateSchatParams,
  schatIdSchema,
  insertSchatParams,
  updateSchatParams,
} from "@/lib/db/schema/schats";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSchats = () => revalidatePath("/schats");

export const createSchatAction = async (input: NewSchatParams) => {
  try {
    const payload = insertSchatParams.parse(input);
    await createSchat(payload);
    revalidateSchats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSchatAction = async (input: UpdateSchatParams) => {
  try {
    const payload = updateSchatParams.parse(input);
    await updateSchat(payload.id, payload);
    revalidateSchats();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSchatAction = async (input: SchatId) => {
  try {
    const payload = schatIdSchema.parse({ id: input });
    await deleteSchat(payload.id);
    revalidateSchats();
  } catch (e) {
    return handleErrors(e);
  }
};