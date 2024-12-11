import { AnalaticsChart } from "@/components/analaticschart/AnalaticsChart";

export default function dashbord(){
    return (
        <div className="min-h-screen my-10 mx-10">
        <div className="flex justify-between my-5 font-bold text-3xl">
          <h1>Dashbord</h1>
          </div>
        <AnalaticsChart/>
          </div>
         
       
      );
}