import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) navigate("/dashboard");
    }, []);

    return <div className="w-full my-10 flex justify-center ">Welcome</div>;
};

export default WelcomePage;
