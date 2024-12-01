import Heading from "@/components/heading";
import { NavBar } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar>
                <Link to="/dashboard">
                    <Button className="" variant={"default"}>
                        Dashboard
                        <ArrowUpRight className="size-4" />
                    </Button>
                </Link>
            </NavBar>
            <div className="w-full my-10 flex justify-center py-20 flex-col">
                {/* <LoadingSpinner /> */}
                <Heading className="text-center mt-10 sm:text-5xl">
                    Oops!
                </Heading>
                <p className="text-sm/6 text-gray-500 font-medium max-w-prose  text-center mx-auto mt-4">
                    We couldn't find the page you were looking for.
                </p>
                <div className="text-center mt-10">
                    <Button
                        variant="default"
                        onClick={() => navigate(-1)}
                        className="items-center"
                    >
                        <ArrowLeft /> Go Back
                    </Button>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
