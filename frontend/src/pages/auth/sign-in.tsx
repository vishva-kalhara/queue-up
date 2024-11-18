import { NavBar } from "@/components/nav-bar";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) navigate("/dashboard");
    }, []);

    return (
        <>
            <NavBar />

            <div className="w-full my-10 flex justify-center ">
                <SignIn />
            </div>
        </>
    );
};

export default SignInPage;
