import React from "react";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { IoDocumentSharp } from "react-icons/io5";
import { IoLinkSharp } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
function Sidebar() {
  const links = [
    {
      title: "Tweets",
      icon: <FaTwitter />,
      href: "/tweets"
    },
    {
      title: "Video",
      icon: <FiYoutube />,
      href: "/videos"
    },
    {
      title: "Documents",
      icon: <IoDocumentSharp />,
      href : "/documents"
    },
    {
      title: "Links",
      icon: <IoLinkSharp />,
      href : "/links" 
    },
    
  ];
  return (
    <div className="max-w-3xs w-full h-screen fixed top-0 left-0 bg-neutral-100">
      <div className="py-4 text-center"> 
      <Link className="text-2xl font-medium text-black" href="/">Second Brain</Link> 
      </div> 
      <nav className="flex flex-col items-center justify-start gap-6 h-screen pt-16">
            {links.map( link => <Link href={link.href} key={link.href} className="text-black flex items-center gap-4 text-xl  hover:bg-neutral-300 hover:w-[200px] px-5 py-3 rounded-md w-[200px] bg-neutral-200 cursor-pointer " > {link.icon} {link.title}</Link>)}
      </nav>
    </div>
  );
}

export default Sidebar;
