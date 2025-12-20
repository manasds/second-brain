import Image from "next/image";
import Card from "@/components/Card";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LoginButton from "@/components/LoginButton";
import { client } from "@/lib/prisma";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Landing from "@/components/landing";
import Header from "@/components/header";
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
      <div className="min-w-0 h-full bg-neutral-200 pl-64 text-black">
        <Header />
        <div className="w-full flex-1 flex flex-col items-center gap-8 pt-8 ">
          {/* <Card
            title="Theo video on react"
            content="hello this video is of theo browne about an image uploader in react"
            link="https://www.youtube.com/embed/d5x0JCZbAJs?si=DIoAufsSRBT6LNOt"
            tags={["tech", "theo", "react"]}
          />  */}
          {cards.map((card: Memory) => (
            <Card
              key = {card.id} 
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
  return <Landing />;
}
