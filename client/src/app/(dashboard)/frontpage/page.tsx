import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserNav from "@/components/UserNav";
import Sidebar from "@/components/Sidebar";

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
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p>Welcome to your dashboard.</p>
          <div className="mt-6">
            {Array.from({ length: 100 }, (_, i) => (
              <p key={i} className="text-gray-600">
                Scrollable content line {i + 1}.
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
