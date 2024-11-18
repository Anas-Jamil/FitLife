import { Dumbbell, Weight, WeightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
      <nav className="h-14 w-full bg-white sticky top-0 z-50 shadow-md">
          <div className="max-w-screen-xl mx-auto flex justify-between items-center h-full px-4">
          <div className="flex items-center cursor-pointer">
                {/* <Image
                    src="/logo_transparent.png"  // Path to the logo inside the 'public' folder
                    alt="FitLife Logo"
                    width={120}  // Adjust the width as needed
                    height={50}  // Adjust the height as needed
                /> */}

            <div className="flex flex-row">
            <Dumbbell className="mt-2 mr-2"/>
            <h1 className="text-2xl sm:text-3xl font-bold text-black ">
              FIT<span className="text-blue-500">LIFE</span>
            </h1>
            </div>
           </div>
           {/* Join now button */}
            <div className="">
              <Link href="/signup">
                <button
                aria-label="Join Now to start your fitness journey"
                className="bg-blue-400 px-6 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-400/50 shadow-md"
                >
                <p className="text-black font-semibold text-sm">Sign Up</p>
                </button>
              </Link>
            </div>
          </div>
      </nav>
    );
  };
  
  export default Navbar;
  