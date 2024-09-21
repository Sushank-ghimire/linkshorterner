import { getSessions } from "@/app/action";
import { redirect } from "next/navigation";

const Authenticator = async ({
  children,
  auth,
}: {
  children: React.ReactNode;
  auth: boolean;
}) => {
  const sessions = await getSessions();

  if (auth) {
    let isLoggedIn = sessions.isLoggedIn;
    if (!isLoggedIn) {
      return redirect("/");
    }
  }

  return <>{children}</>;
};

export default Authenticator;
