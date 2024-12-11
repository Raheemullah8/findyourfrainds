import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link'; // Use Next.js's Link for navigation
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
const session = await auth();
console.log("sessuion",session)
if (!session) {
  redirect('/signin'); 
}
if(session){
  if(session.user.role === "users") redirect('/')
}
  return (
    <html lang="en">
      <body>
        <Tabs defaultValue="dashbord" className="w-full">
          <TabsList className="w-full py-10 bg-slate-400 text-white">
          <Link href="/admin/dashbord">
            <TabsTrigger value="dashbord">
             Dashbord
            </TabsTrigger>
            </Link>
            <Link href="/admin/users">
            <TabsTrigger value="users">
             Users
            </TabsTrigger>
            </Link>
            <Link href="/admin/categories">
            <TabsTrigger value="categories">
              Categories
            </TabsTrigger>
            </Link>
            <Link href="/admin/events">
             <TabsTrigger value="events">
              Events
            </TabsTrigger>
            </Link>
            <Link href="/admin/subcategories">
            <TabsTrigger value="subcategories">
             Subcategories
            </TabsTrigger>
            </Link>
          </TabsList>

          <TabsContent value="dashbord">{children}</TabsContent>
          <TabsContent value="users">{children}</TabsContent>
          <TabsContent value="categories">{children}</TabsContent>
          <TabsContent value="events">{children}</TabsContent>
          <TabsContent value="subcategories">{children}</TabsContent>
          <TabsContent value="subcategories"></TabsContent>
        </Tabs>
        
       
      </body>
    </html>
  );
}
