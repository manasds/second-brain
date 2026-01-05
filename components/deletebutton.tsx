"use client";
import React from 'react'
import { deletememory } from '@/actions/addmemory';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { RiDeleteBin6Line } from "react-icons/ri";
function Deletebutton({id} : {id : string}) {
    const router = useRouter()
    async function Delete(){
        try{
            await deletememory(id) ;
            router.refresh() ;
        } catch(e){
            console.log(e instanceof Error ? e.message : "Failed to delete memory")
        }
    }
 return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="size-8 cursor-pointer  shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-95 transition-transform duration-200 ease-in-out ring-1 ring-gray-400" variant="outline"><RiDeleteBin6Line className='text-red-500' /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-neutral-100'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your memory 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={Delete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Deletebutton