import Deletebutton from "./deletebutton";
import TextArea from "./TextArea";
import { Badge } from "@/components/ui/badge";
interface Cardprops {
  id: string;
  title: string;
  content: string;
  link: string | null;
  tags: string[];
}
export default function Card({ title, content, link, tags, id }: Cardprops) {
  return (
    <div className="w-3/4  max-h-[400px] h-[400px] px-3 py-0.5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.4)] rounded-lg hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
      <div className="flex flex-col justify-between  h-full">
        <div className="h-14 w-full  text-lg p-3 font-semibold flex justify-between tracking-wide ">
          {title}
          <Deletebutton id={id} />
        </div>
        <div className="w-full h-72 flex justify-between gap-1 p-1">
          <div className="flex-1 min-w-0  px-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] pt-8">
            <TextArea content={content} id={id} />
          </div>
          <div className="w-[345px]  min-w-0  px-2 aspect-video overflow-hidden ">
            <iframe
              className="rounded-lg border-none"
              width="full"
              height="270px"
              src={link || undefined}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen 
            ></iframe>
          </div>
        </div>
        <div className="h-14 w-full flex flex-wrap gap-4 py-2.5 px-2.5">
          {tags.map((tag) => (
            <Badge
              variant="default"
              className="bg-slate-300  dark:bg-blue-200 text-black"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
