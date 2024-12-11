import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";

export default async function SignIn() {
  const session = await auth();
  
  

    
    if(session){
      if (session.user.role === "users") {
        redirect('/');
      }
      if (session.user.role === "admin") {
        redirect('/admin/dashbord');
      }
    }



  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        action={async () => {
          "use server";
          await signIn("google"); // Sign-in via Google
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
