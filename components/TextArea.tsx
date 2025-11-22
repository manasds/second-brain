"use client";
import { useRef, useState } from "react"
import { updatetext } from "@/actions/updatetext";
export default function TextArea({content , id} : {content : string , id:string}){
   const inputref = useRef<HTMLTextAreaElement>(null) ;
   const [loading , setloading] = useState(false);
   async function handleclick(){
      setloading(true)
      const res = await updatetext(inputref.current?.value || "", id);
      if(res.success){
         console.log("added successfully")
      }else{
         console.log("error")
      }
      setloading(false);
   }
   return(
    <>
    <textarea className="resize-none overflow-auto h-48 w-full py-1 px-2 border rounded-l-lg border-black" defaultValue={content} ref={inputref} ></textarea>
    <div className="w-full flex justify-end p-1 px-2">
        <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer px-5 py-1 text-white rounded-md " disabled={loading} onClick={handleclick}>{loading ? "saving" : "save"}</button>
     </div>
    </>
   )
}