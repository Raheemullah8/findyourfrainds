import { getEvents } from "@/actions/events"
import { getCategory } from "@/actions/category"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Addeventsform from "@/components/addevintsheet/AddeventForm"
import { auth } from "../../../../../auth"
  
export default async function events(){
  const event = await getEvents()
  const {category} = await getCategory()

  const session = await auth();

    return(
        <div className="min-h-screen my-10 mx-10">
        <div className="flex justify-between my-5 font-bold text-3xl">
          <h1>Events</h1>
          <Addeventsform session={session} category={category}/>
          </div>
  
          <Table>
      <TableCaption>A list of your recent Events</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Thumbnail</TableHead>
          <TableHead className="text-center">Title</TableHead>
          <TableHead className="text-center">Description</TableHead>
          <TableHead className="">Events</TableHead>
          <TableHead className="">Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {event?.events?.map((eventdata) => (
          <TableRow key={eventdata._id}>
            <TableCell className=""><img src={eventdata.thumbnail} className="rounded-full" /></TableCell>
            <TableCell className="text-center">{eventdata.title}</TableCell>
            <TableCell className="text-center">{eventdata.description}</TableCell>
            <TableCell className="">{eventdata?.category?.title}</TableCell> 
            <TableCell className="">{eventdata.address}</TableCell> 
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
          </div>
    )
}