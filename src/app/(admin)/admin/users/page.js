import { usersdata } from "@/actions/users";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default async function users() {
  const userdata = await usersdata();

  return (
    <div className="min-h-screen my-10 mx-10">
      <div className="flex justify-between my-5 font-bold text-3xl">
        <h1>Users</h1>
      </div>

      <Table>
        <TableCaption>A list of your recent Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ProfileImages</TableHead>
            <TableHead className="text-center">Fullname</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="">Events</TableHead>
            <TableHead className="">Locations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userdata?.users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="">
                <Avatar>
                 <AvatarImage src={user.profileimage} height={40} width={50}/> 
                 <AvatarFallback>-</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-center">{user.fullname}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="">{user.events}</TableCell>
              <TableCell className="">{user.Location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
