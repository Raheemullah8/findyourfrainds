"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addevents } from "@/actions/events";
import { useToast } from "@/hooks/use-toast";

// Schema for validation using Zod
const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  thumbnail: z.string().url("Invalid URL for thumbnail"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  category: z.string().min(1, "Category is required"),
  address: z.string().min(1, "Address is required"), // Add this line for address
});

export default function Addeventsform({ session, categories }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      thumbnail: "",
      latitude: "",
      longitude: "",
      category: "",
      address: "", // Default value for address
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const obj = {
      ...data,
      location: {
        lat: parseFloat(data.latitude),
        long: parseFloat(data.longitude),
      },
      createby: session.user._id, // Here you pass the user ID from session
    };
    console.log("obj=>", obj);

    await addevents(obj);
    setIsOpen(false);
    toast({ title: "Event added successfully" });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Event</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto sm:w-[540px] w-[400px]">
        <SheetHeader>
          <SheetTitle>Add New Event</SheetTitle>
          <SheetDescription>
            Fill in the details to add a new event.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => <Input type="date" {...field} />}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => <Input type="date" {...field} />}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => <Input type="time" {...field} />}
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm">
                  {errors.startTime.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => <Input type="time" {...field} />}
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
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
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => <Input type="url" {...field} />}
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitude</Label>
              <Controller
                name="latitude"
                control={control}
                render={({ field }) => (
                  <Input type="number" step="any" {...field} />
                )}
              />
              {errors.latitude && (
                <p className="text-red-500 text-sm">
                  {errors.latitude.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="longitude">Longitude</Label>
              <Controller
                name="longitude"
                control={control}
                render={({ field }) => (
                  <Input type="number" step="any" {...field} />
                )}
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm">
                  {errors.longitude.message}
                </p>
              )}
            </div>
          </div>

          {/* New Address Field */}
          <div>
            <Label htmlFor="address">Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isSubmitting ? "Loading..." : "Add Event"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
