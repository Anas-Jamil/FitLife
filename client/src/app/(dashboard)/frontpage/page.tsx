import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const page = async () => {

  const session = await getServerSession(authOptions);

  return (
    <div>Welcome to FitLife</div>
  )
};

export default page;