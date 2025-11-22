"use server";
interface memory {
    title : string ;
    content : string ;
    link : string ;
    tags : string[] ;

}
export function addmemory({title , content , link , tags} : memory ){
        title = title.trim()
}