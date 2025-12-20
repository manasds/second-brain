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
  function convertToYouTubeEmbed(link: string) {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;

    const match = link.match(regex);

    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  }
  const userId = session.user.id;
  const validated = memoryschema.safeParse(formdata);
  if (!validated.success) {
    throw new Error("invalid form data");
  }
  const { title, description, link, type, tags } = validated.data;
  const url = convertToYouTubeEmbed(link);
  const tagslist = tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  try {
    const memory = await client.memory.create({
      data: {
        title: title.trim(),
        content: description.trim(),
        link: url || null,
        tags: tagslist,
        type,
        userId,
      },
    });
    return { success: true, memory };
  } catch (error) {
    console.error("failed to create memory", error);
    throw new Error("failed to save memory");
  }
}

export async function deletememory(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Not authenticated");
  }
  const userId = session.user.id;
  try {
    await client.memory.delete({
      where: { userId, id },
    });
  } catch (error) {
    console.error(error instanceof Error ? error.message : "deletion failed");
    throw new Error("deletion failed");
  }
}
