import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !isSignedIn) navigate("/sign-in");
    }, []);
    return <div className="w-full my-10 flex justify-center ">Dashboard</div>;
};

export default DashboardPage;
