import Authenticator from "@/auth/Authenticator";
import SpecificUrl from "@/components/DashboardComponents/Details/SpecificUrl";

interface PageProps {
  params: {
    linkId: string; // This matches the dynamic route segment
  };
}

const Page = ({ params }: PageProps) => {
  
  const { linkId } = params; // Destructure the linkId from params

  return (
    <Authenticator auth={true}>
      <SpecificUrl linkId={linkId} />
    </Authenticator>
  );
};

export default Page;
