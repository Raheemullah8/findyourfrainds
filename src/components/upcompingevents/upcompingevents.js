"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, MapPinIcon, CheckIcon } from "lucide-react";
import Addeventsform from "../addevintsheet/AddeventForm";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function UpcomingEvents({
  session,
  categories = [],
  events: initialEvents = [],  // Renamed 'events' to 'initialEvents'
  chosenCategory,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(chosenCategory || "all");
  const [events, setEvents] = useState(initialEvents); // State for filtered events

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Function to filter events based on the selected category
  const filterEventsByCategory = (selectedCategoryId) => {
    if (selectedCategoryId === "all" || !selectedCategoryId) {
      // Show all events when "All" is selected
      return initialEvents;
    }
    // Otherwise, filter events by category ID
    return initialEvents.filter((event) => event.category._id === selectedCategoryId);
  };

  // Update the events whenever category changes
  useEffect(() => {
    setEvents(filterEventsByCategory(value));
  }, [value, initialEvents]); // Run when 'value' or 'initialEvents' changes

  const handleSelectCategory = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set("category", id);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
    setValue(id);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <div className="flex gap-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? categories.find((category) => category._id === value)?.title || "Select category..."
                    : "Select category..."}
                  <CheckIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <div className="flex flex-col">
                  <Button
                    variant="outline"
                    onClick={() => handleSelectCategory("all")}
                    className="text-left"
                  >
                    All
                  </Button>
                  {categories.map((data) => (
                    <Button
                      key={data._id}
                      variant="outline"
                      onClick={() => handleSelectCategory(data._id)}
                      className="text-left"
                    >
                      {data.title}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {session ? (
              <Addeventsform session={session} categories={categories} />
            ) : (
              <Link href="/signin">
                <Button>Login to Add Event</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.category.title}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="aspect-video w-full mb-4">
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
                <p className="flex items-center mb-2">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {new Date(event.startDate).toLocaleDateString()}{" "}
                  {event.startTime} - {event.endTime}
                </p>
                <p className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {event.address}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-auto">
                <div className="flex items-center">
                  <img
                    src={event.createby.profileimage}
                    alt={event.createby.fullname}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm">{event.createby.fullname}</span>
                </div>
                {/* <Link href={`/event/${event._id}`}> */}
                  <Button>View Details</Button>
                {/* </Link> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
