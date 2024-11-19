import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
    const { isSignedIn, isLoaded, userId } = useAuth();
    const navigate = useNavigate();

    if (isLoaded && !isSignedIn) navigate("/sign-in");

    // const { data } = useQuery({
    //     // queryKey: ["logged-user"],
    //     queryFn: () => {},
    // });

    return <Outlet />;
};

export default DashboardLayout;
