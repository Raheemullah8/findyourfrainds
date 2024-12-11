import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UpcomingEvents from "@/components/upcompingevents/upcompingevents";
import { auth } from "../../auth";
import { getCategory } from "@/actions/category";
import { getEvents } from "@/actions/events";
import Header from "@/components/Header/header";  // Import the Header component

async function Home({ searchParams }) {
  const { category: chosenCategory } = searchParams;
  const session = await auth();
  const { events } = await getEvents();
  const { category: categories } = await getCategory();

  return (
    <>
      {/* Header Section */}
      <Header /> {/* Display the header component */}

      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Friend</h1>
          <p className="text-xl mb-8">Discover events and connect with like-minded people</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <Input type="text" placeholder="Search events" className="bg-white text-black" />
            <Button variant="secondary">Search</Button>
          </div>
        </div>
      </section>

      <section>
        <UpcomingEvents 
          events={events} 
          categories={categories} 
          chosenCategory={chosenCategory} 
          session={session} 
        />
      </section>
    </>
  );
}

export default Home;
