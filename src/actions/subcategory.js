"use server"

import { revalidatePath } from "next/cache";


export const  addsubCategory = async (obj) => {
  const added = await fetch(`${process.env.BASE_URL}api/subcategories`, {
    method: "POST",
    body: JSON.stringify(obj),
  });
  if (added.ok) {
    console.log("SubCategory added successfully");
    revalidatePath("/admin/categories");
  }
};

export const getSubcategory  = async (category)=>{
    let url ;
    if(category){
      url = `${process.env.BASE_URL}api/subcategories?category=${category}`
    }else{
        url = `${process.env.BASE_URL}api/subcategories`

    }
  let subcategories =  await fetch(url,{cache:"no-cache"});
  subcategories = await subcategories.json();
  return subcategories 
}