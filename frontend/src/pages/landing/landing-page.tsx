import Heading from "@/components/heading";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { NavBar } from "@/components/nav-bar";
import ShinyButton from "@/components/shiny-button";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    useEffect(() => {
        document.title = "Queue Up | Headless waitlist management";
    }, []);

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
            <section className="relative bg-gradient-to-b from-[#D7EBFB] to-[#E0CFFF] py-24 sm:py-32">
                <MaxWidthWrapper className="text-center">
                    <div className="relative mx-auto text-center flex flex-col items-center gap-10">
                        <div>
                            <Heading>
                                <span className="h-20">
                                    Effortlessly Manage Waitlists for your
                                </span>
                                <br />
                                <span>Next Big Project.</span>
                            </Heading>
                        </div>
                        <div className="w-full max-w-80">
                            <ShinyButton
                                href="/dashboard"
                                text="Get Started Now"
                                className="relative z-10 py-3 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-300"
                            />
                        </div>
                        <div className="mt-20 ">
                            <img
                                src="./hero2.jpeg"
                                className="rounded-3xl border-[10px] border-black border-opacity-5"
                            />
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>
            <section className=" bg-white">
                <MaxWidthWrapper>
                    <div className="flex flex-col py-10 text-center font-poppins text-sm/6  gap-2">
                        <p className="text-gray-600">
                            A fun project that turned out much better than I
                            expected 😍
                        </p>
                        <p className="text-gray-400">
                            © 2024{" "}
                            <Link
                                to="https://github.com/vishva-kalhara/"
                                className="underline font-medium underline-offset-2"
                            >
                                Wishva Kalhara
                            </Link>
                        </p>
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
};

export default LandingPage;
