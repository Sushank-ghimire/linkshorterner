import Authenticator from "@/auth/Authenticator";
import Landing from "@/components/DashboardComponents/Landing";

const Dashboard = () => {
  return (
    <Authenticator auth={true}>
      <Landing />
    </Authenticator>
  );
};

export default Dashboard;
