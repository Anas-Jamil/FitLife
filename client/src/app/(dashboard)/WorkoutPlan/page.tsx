import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserNav from "@/components/UserNav";
import Sidebar from "@/components/Sidebar";
import WorkoutPage from "@/components/workoutWrapper";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <meta httpEquiv="refresh" content="0; url=/signin" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <UserNav userFirstName={session?.user.firstName || "User"} />

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        <Sidebar />
        <div
          className="flex-1 p-4 bg-gray-100 transition-all duration-300"
          style={{
            marginLeft: `calc(var(--sidebar-width, 16rem))`, // Dynamically adjusts with the sidebar width
          }}
        >
          <WorkoutPage/>
        </div>
      </div>
    </div>
  );
}
