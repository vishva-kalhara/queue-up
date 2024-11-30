import { NavBar } from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
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
        </>
    );
};

export default LandingPage;
