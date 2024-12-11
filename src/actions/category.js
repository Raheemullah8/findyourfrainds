"use server";

import { revalidatePath } from "next/cache";

export const addCategory = async (obj) => {
  const added = await fetch(`${process.env.BASE_URL}api/categories`, {
    method: "POST",
    body: JSON.stringify(obj),
  });
  if (added.ok) {
    console.log("Category added successfully");
    revalidatePath("/admin/categories");
  }
};

export const getCategory = async () => {
  let categories = await fetch(`${process.env.BASE_URL}api/categories`,{cache:'no-cache'}); 
  categories = await categories.json();  
  console.log(categories);
  return categories;
  revalidatePath('/admin/categories');
}
