import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from "@/lib/auth";
import {client} from "@/lib/prisma";
    export async function GET(request: Request) {
        const session = await auth.api.getSession({
        headers: await headers()
    }) 
        if(!session){
            return NextResponse.json({message :"login first"});
        }
        const userId = session.user.id ;
        const memories = await client.memory.findMany({
            where : {userId} ,
            orderBy : {createdAt : "desc"} ,
        })

        return NextResponse.json(memories);
    }