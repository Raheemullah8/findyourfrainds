import { revalidatePath } from "next/cache";

export const usersdata = async () =>{
   let users = await fetch(`${process.env.BASE_URL}/api/users`,{
    cache:"no-cache"
   });
   users = await users.json();
   return users;
   revalidatePath('/admin/users')

}