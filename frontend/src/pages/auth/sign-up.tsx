import { NavBar } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUpPage = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) navigate("/dashboard");
    }, [isSignedIn, navigate]);

    return (
        <>
            <NavBar>
                <Link to="/sign-in">
                    <Button variant={"default"}>
                        Sign In
                        <ArrowUpRight className="size-4" />
                    </Button>
                </Link>
            </NavBar>
            <div className="w-full my-10 flex justify-center ">
                <SignUp forceRedirectUrl={"/dashboard"} />
            </div>
        </>
    );
};
