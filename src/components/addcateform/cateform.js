"use client"
import react,{useState,useRef} from "react"

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
import { uploadImage } from "@/actions/upload"
import { addCategory } from "@/actions/category"
import { useToast } from "@/hooks/use-toast"




export function AddCat() {
  const [open, setOpen] = useState(false)
  const isDesktop =("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add-Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add-Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
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

function ProfileForm({ className }) {
  const [loading,setloading] = useState(false)
  const formRef = useRef()
  const { toast } = useToast()

  const handleAddcategory = async (formdata) => {
    setloading(true)
    let uploadLink = await uploadImage(formdata); 
    const obj = {
      title:formdata.get("title"),
      description:formdata.get("description"),
      thumbnail:uploadLink
    };
    await addCategory(obj)
    toast({
      title: "Category Add Sucessfully ",
     
    })

    formRef?.current?.reset();
    setloading(false)
  };

  return (
    <form ref={formRef}  action={handleAddcategory} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input requried type="text" id="title" name="title" />
      </div>
    
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input type="text" name="description" id="description"  />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="thumbnil">thumbnail</Label>
        <Input type="file" id="thumbnail" name="thumbnail"  />
      </div>
      <Button disabled={loading} type="submit">{loading?"Loading...":"Add Category"}</Button>
    </form>
  )
}
