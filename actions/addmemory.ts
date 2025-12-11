"use server";
import { client } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { memoryschema, FormFields } from "@/lib/schema";

export async function addmemory(formdata: FormFields) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Not authenticated");
  }
  const userId = session.user.id;
  const validated = memoryschema.safeParse(formdata);
  if (!validated.success) {
    throw new Error("invalid form data");
  }
  const { title, description, link, type, tags } = validated.data;
  const tagslist = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  try {
    const memory = await client.memory.create({
      data: {
        title: title.trim(),
        content: description.trim(),
        link: link || null,
        tags: tagslist,
        type: type,
        userId,
      },
    });
    return { success: true, memory };
  } catch (error) {
    console.error("failed to create memory", error);
    throw new Error("failed to save memory");
  }
}
