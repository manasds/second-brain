import Image from "next/image";
import Card from "@/components/Card";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LoginButton from "@/components/LoginButton";
import { client } from "@/lib/prisma";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

type Memory = Awaited<ReturnType<typeof client.memory.findMany>>[0];

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
      <div className="min-w-0 h-full bg-neutral-200 pl-64 text-black ">
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
          {cards.map((card: Memory) => (
            <Card
              id={card.id}
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
    <div className="min-w-0 h-screen text-black flex flex-col absolute w-full">
      <header className="flex justify-end p-3.5">
        <LoginButton />
      </header>
      <div className="flex flex-col items-center justify-center pt-28 w-full gap-4 ">
        <div className="font-semibold text-white text-5xl max-w-xl selection:text-black selection:bg-neutral-300 tracking-wide leading-16">
          Attention span less than that of a Goldfish ?
        </div>
        <div className="text-white text-md flex justify-start max-w-xl w-full pl-1.5">
          <h3>I wont fix it , duh . this is another note making app</h3>
        </div>
      </div>
    </div>
  );
}
