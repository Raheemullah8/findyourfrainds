"use server";

import { revalidatePath } from "next/cache";

export const addevents = async (obj) => {
    const added = await fetch(`${process.env.BASE_URL}api/events`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
    }, { cache: 'no-cache' });

    if (added.ok) {
        console.log("Event added successfully");
        revalidatePath("/admin/events");
    } else {
        const errorData = await added.json();
        console.error("Failed to add event:", errorData.msg);
        // You could use toast or other mechanisms to notify the user of the failure
    }
}

export const getEvents = async () =>{
    let events = await fetch(`${process.env.BASE_URL}api/events`);
    events = events.json();
    console.log("events get sucess full");
    return events;
    revalidatePath("/admin/events");

}