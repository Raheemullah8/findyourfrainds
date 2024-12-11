import { getCategory } from "@/actions/category"
import { getSubcategory } from "@/actions/subcategory"
import CategoryDropdown from "@/components/categorydropdown/categoryDropdown"
import { Subcat } from "@/components/subcategory/subcategory"
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

export default async function subcategory({searchParams}) {
  const subcategorie = await getSubcategory(searchParams.category);
  const categories = (await getCategory()).category
  
  
  return (
    <div className="min-h-screen my-10 mx-10">
      <div className="flex justify-between my-5 font-bold text-3xl">
        <h1>SubCategory</h1>

        <div className="flex gap-5">
          <CategoryDropdown categories={ categories } />
          <Subcat categories={categories} />
        </div>
      </div>

      <Table>
        <TableCaption>A list of your recent SubCategory</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Thumbnail</TableHead>
            <TableHead className="text-end font-bold">Title</TableHead>
            <TableHead className="text-end font-bold">Category</TableHead>
            <TableHead className="text-center font-bold">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategorie.subCategory?.map((subcategorys) => (
            <TableRow key={subcategorys._id}>
              <TableCell className=""><img src={subcategorys.thumbnail} className="rounded-full" /></TableCell>
              <TableCell className="text-end">{subcategorys.title}</TableCell>
              <TableCell className="text-end">{subcategorys.category.title}</TableCell>
              <TableCell className="text-center">{subcategorys.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
