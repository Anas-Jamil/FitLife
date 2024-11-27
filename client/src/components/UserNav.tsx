import { Dumbbell } from "lucide-react";
import Link from "next/link";

interface UserNavProps {
  userFirstName: string;
}

const UserNav = ({ userFirstName }: UserNavProps) => {
  return (
    <nav className="sticky top-0 z-50 h-14 bg-white shadow-md">
      <div className="max-w-screen-3xl mx-auto flex justify-between items-center h-full px-4">
        <Link href="/">
        <div className="flex items-center cursor-pointer">
          <Dumbbell className="mt-2 mr-2" />
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            FIT<span className="text-blue-500">LIFE</span>
          </h1>
        </div>
        </Link>

        {/* User Info */}
        <div>
          <p className="font-semibold text-md">
            Welcome, <span className="text-md font-bold">{userFirstName}</span>!
          </p>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
