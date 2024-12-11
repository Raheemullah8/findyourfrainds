"use client"
import React,{useRef, useState} from "react"

import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadImage } from "@/actions/upload"

import { useToast } from "@/hooks/use-toast"
import { addsubCategory } from "@/actions/subcategory"

export function Subcat({categories}) {
  const [open, setOpen] = useState(false)
  const isDesktop =("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add--Sub-Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add-Sub-Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm onClose={()=>setOpen(false)} categories={categories} />
        </DialogContent >
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when youre done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className,categories,onClose}) {
  const formRef = useRef()
  const { toast } = useToast()
  const handlesubcategory = async (formdata)=>{
     let uploadlink = await uploadImage(formdata)
     let obj = {
       title:formdata.get("title"),
        description : formdata.get("description"),
        thumbnail:uploadlink,
        category :formdata.get("category"),
     }  
     await addsubCategory(obj)
     toast({
      title: "SubCategory Add Sucessfully ",
     
    })
     formRef?.current?.reset();
     onClose()
       
  }
  return (
    <form ref={formRef} action={handlesubcategory} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Title</Label>
        <Input type="text" id="title" name="title"  />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Description</Label>
        <Input type="text" id="description" name="description" />
      </div>

      <div className="grid gap-2">
      <Select name="category">
      <SelectTrigger className="">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        { categories.map((data) => (
          <SelectItem key={data._id} value={data._id}>
            {data.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">thumbnail</Label>
        <Input type="file" id="thumbnail" name="thumbnail" />
      </div>
     
      <Button type="submit">Add-Subcategories</Button>
    </form>
  )
}
