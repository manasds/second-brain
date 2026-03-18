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
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg border border-slate-100">
      <form
        className="h-full w-full flex flex-col gap-4 p-2 font-sans"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1.5 block">Title</label>
          <input 
            className="w-full bg-white py-2.5 px-3 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200" 
            placeholder="backend playlist" 
            {...register("title")} 
          />
          {errors.title && (
            <div className="text-red-500 text-xs mt-1">{errors.title.message}</div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1.5 block">Description</label>
          <textarea
            className="w-full bg-white py-2.5 px-3 min-h-20 resize-none rounded-md border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
            {...register("description")}
            placeholder="this playlist is about backend from first principles"
          />
          {errors.description && (
            <div className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1.5 block">Link</label>
          <input 
            className="w-full bg-white py-2.5 px-3 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200" 
            {...register("link")} 
            placeholder="youtube.com/v?=ashref" 
          />
          {errors.link && (
            <div className="text-red-500 text-xs mt-1">{errors.link.message}</div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1.5 block">Type</label>
          <select 
            className="w-full py-2.5 px-3 border border-slate-200 rounded-md bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
            {...register("type")}
          >
            <option value="">Select</option>
            <option value="video">Video</option>
            <option value="tweet">Tweet</option>
            <option value="link">Link</option>
          </select>
          {errors.type && (
            <div className="text-red-500 text-xs mt-1">{errors.type.message}</div>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600 mb-1.5 block">Tags</label>
          <input 
            className="w-full bg-white py-2.5 px-3 rounded-md border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200" 
            {...register("tags")} 
            placeholder="tech , backend , fpt" 
          />
          {errors.tags && (
            <div className="text-red-500 text-xs mt-1">{errors.tags.message}</div>
          )}
        </div>
      </form>
      <button
        type="submit"
        className="m-2 py-2.5 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 hover:scale-[0.98] transition-all duration-200 font-medium text-sm"
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}

export default Form;
