"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { addmemory } from "@/actions/addmemory";
import { useRouter } from "next/navigation";
import {memoryschema , type FormFields} from "@/lib/schema" ;

function Form({setisOpen} : {setisOpen : (arg : boolean ) => void }) {
  const [loading , setloading] = useState(false) ;
  const router = useRouter() ;
  const {
    register,
    handleSubmit,
    formState: { errors , isValid },
  } = useForm<FormFields>({
    resolver: zodResolver(memoryschema),
  });
  async function onSubmit(data: FormFields) {
    console.log(data) ;
     try {
      setloading(true) ;
      const {memory , success} = await addmemory(data) ;
      if (success){
        setloading(false);
        setisOpen(false);
      }
      console.log("memory");
      console.log(memory);
      router.refresh() ;
     } catch (error){
      console.error(error) ;
     }
  }
  return (
    <div className="h-full flex flex-col p-1 bg-white rounded-lg">
      <form
        className="h-full w-full flex flex-col gap-1 p-1 font-normal tracking-wider font-serif"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-neutral-500">Title</label>
        <input className="bg-white py-2 px-1 rounded-md border-2 border-neutral-200 " placeholder="backend playlist" {...register("title")} />
        {errors.title && (
          <div className="text-red-500 font-sans text-xs">{errors.title.message}</div>
        )}
        <label>description</label>
        <textarea
          className="bg-white py-2 px-1 min-h-16 resize-none rounded-md border-2 border-neutral-200  "
          {...register("description")}
          placeholder="this playlist is about backend from first principles"
        />
        {errors.description && (
          <div className="text-red-500 font-sans text-xs ">
            {errors.description.message}
          </div>
        )}
        <label>link</label>
        <input className="bg-white py-2 px-1 rounded-md border-2 border-neutral-200" {...register("link")} placeholder="youtube.com/v?=ashref" />
        {errors.link && (
          <div className="text-red-500 font-sans text-xs">{errors.link.message}</div>
        )}
        <label>type</label>
        <select className="py-2 border border-black rounded-md" {...register("type")}>
          <option value="">Select</option>
          <option value="video">Video</option>
          <option value="tweet">Tweet</option>
          <option value="link">Link</option>
        </select>
        {errors.type && (
          <div className="text-red-500 font-sans text-xs">{errors.type.message}</div>
        )}
        <label>tags</label>
        <input className="bg-white py-2 px-1 rounded-md border-2 border-neutral-200 " {...register("tags")} placeholder="tech , backend , fpt " />
        {errors.tags && (
          <div className="text-red-500 font-sans text-xs">{errors.tags.message}</div>
        )}
      </form>
      <button
        type="submit"
        className="py-2 px-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 hover:scale-95 transition-transform duration-200 ease-in-out w-20 mx-auto m-4"
        onClick={handleSubmit(onSubmit)}
        disabled = {loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}

export default Form;
