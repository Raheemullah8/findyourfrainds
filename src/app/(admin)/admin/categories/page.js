
import { getCategory } from "@/actions/category"
import { AddCat } from "@/components/addcateform/cateform"
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
  
  
  
export default async function categories(){
     const categoriesdata = await getCategory()
    return(
        <div className="min-h-screen my-10 mx-10">
        <div className="flex justify-between my-5 font-bold text-3xl">
          <h1>Categories</h1>
          <div><AddCat/></div>
          </div>
  
          <Table>
      <TableCaption>A list of your recent Categories</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-bold">Thumbnil</TableHead>
          <TableHead className="text-end font-bold">Title</TableHead>
          <TableHead className="text-center font-bold">Description</TableHead>
         
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoriesdata?.category?.map((data) => (
          <TableRow key={data._id}>
            <TableCell className=""><img src={data.thumbnail} className="rounded-full" /></TableCell>
            <TableCell className="text-end">{data.title}</TableCell>
            <TableCell className="text-center">{data.description}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
          </div>
    )
}