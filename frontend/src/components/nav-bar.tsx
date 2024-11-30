import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PropsWithChildren } from "react";

export const NavBar = ({ children }: PropsWithChildren) => {
    const { isMobile } = useMediaQuery();

    return (
        <nav className="px-8 py-6 bg-gray-50 border-b-[1px] border-black border-opacity-5">
            <div className="flex justify-between max-w-4xl mx-auto ">
                <div className="flex gap-2">
                    <Link to="/">
                        <Button>Queue Up</Button>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    {!isMobile && (
                        <>
                            <Link
                                target="_blank"
                                to="https://github.com/vishva-kalhara/queue-up"
                            >
                                <Button variant={"outline"}>
                                    <HeartIcon className="fill-red-500 stroke-0" />
                                    Contribute
                                </Button>
                            </Link>
                        </>
                    )}
                    {children}
                </div>
            </div>
        </nav>
    );
};
