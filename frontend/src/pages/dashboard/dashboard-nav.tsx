import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button.tsx";
import { HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query.ts";
import { useState } from "react";
import { CreateApplicationModal } from "@/pages/dashboard/application/create-app-modal.tsx";

const DashboardNav = () => {
    const { isMobile } = useMediaQuery();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="px-8 py-6 bg-gray-50 border-b-[1px] border-black border-opacity-5">
            <div className="flex justify-between max-w-4xl mx-auto ">
                <div className="flex gap-2">
                    <Button size="sm">Queue Up</Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant={"outline"}
                        className={!isMobile ? "h-8" : ""}
                        onClick={() => setIsOpen(true)}
                    >
                        New Application
                    </Button>
                    {!isMobile && (
                        <>
                            <Link to="/github">
                                <Button
                                    size="sm"
                                    variant={"outline"}
                                    className="h-8"
                                >
                                    <HeartIcon className="fill-red-500 stroke-0" />
                                    Contribute
                                </Button>
                            </Link>
                            <Link to="/dashboard/docs">
                                <Button
                                    size="sm"
                                    variant={"outline"}
                                    className="h-8"
                                >
                                    Docs
                                </Button>
                            </Link>
                        </>
                    )}

                    <UserButton />
                    <CreateApplicationModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </div>
            </div>
        </nav>
    );
};

export default DashboardNav;
