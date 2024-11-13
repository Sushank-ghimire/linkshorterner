import Authenticator from "@/auth/Authenticator";
import SpecificUrl from "@/components/DashboardComponents/Details/SpecificUrl";

interface PageProps {
  params: Promise<{
    linkId: string; // This matches the dynamic route segment
  }>;
}

const Page = async (props: PageProps) => {
  const params = await props.params;

  const { linkId } = params; // Destructure the linkId from params

  return (
    <Authenticator auth={true}>
      <SpecificUrl linkId={linkId} />
    </Authenticator>
  );
};

export default Page;
