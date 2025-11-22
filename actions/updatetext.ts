"use server";
import { client } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function updatetext(content: string, id: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;
  try {
    const updated = await client.memory.update({
      where: { userId, id },
      data: { content },
    });
    return { success: true, updated };
  } catch (e) {
    return { success: false};
  }
}
