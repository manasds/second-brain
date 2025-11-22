import Image from "next/image";
import Card from "@/components/Card";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LoginButton from "@/components/LoginButton";
import { client } from "@/lib/prisma";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const userId = session?.user.id;
    console.log(userId);
    const cards = await client.memory.findMany({
      where: { userId },
    });
    console.log(cards);
    return (
      <div className="min-w-0 h-full bg-neutral-200 pl-64 text-black">
        <header className="flex justify-between p-3.5">
          <h1 className="font-medium ml-3.5">All notes</h1>
          <div className="flex justify-between gap-2.5">
            <button className="text-violet-800 bg-violet-200 px-5  py-2 rounded-md flex items-center gap-2 hover:bg-violet-300 cursor-pointer">
              <IoShareSocialOutline />
              Share Brain
            </button>
            <button className="px-7 py-2 rounded-md bg-blue-600 text-white flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-800 ">
              <FaPlus />
              Add Content
            </button>
          </div>
        </header>
        <div className="w-full flex-1 flex flex-col items-center gap-8 pt-8 ">
          {/* <Card
            title="Theo video on react"
            content="hello this video is of theo browne about an image uploader in react"
            link="https://www.youtube.com/embed/d5x0JCZbAJs?si=DIoAufsSRBT6LNOt"
            tags={["tech", "theo", "react"]}
          /> */}
          {cards.map((card) => (
            <Card
              id = {card.id}
              title={card.title}
              content={card.content}
              link={card.link}
              tags={card.tags}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="min-w-0 h-full bg-neutral-200 pl-64 text-black">
      <header className=" h-18 bg-neutral-600 flex justify-end px-2.5">
        <LoginButton />
      </header>
      <div className="flex items-center justify-center">
        <div className="text-2xl font-semibold">Please login first</div>
      </div>
    </div>
  );
}
