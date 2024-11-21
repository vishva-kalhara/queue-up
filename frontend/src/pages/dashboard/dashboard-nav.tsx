import {UserButton} from "@clerk/clerk-react";
import {Button} from "@/components/ui/button.tsx";
import {HeartIcon} from "lucide-react";
import {Link} from "react-router-dom";
import {useMediaQuery} from "@/hooks/use-media-query.ts";

type props = {
    hasBackButton: boolean,
}

const DashboardNav = ({}: props) => {

    const {isMobile} = useMediaQuery();

    return (
        <nav className="px-8 py-6 bg-gray-50 border-b-[1px] border-black border-opacity-5">
            <div className="flex justify-between max-w-4xl mx-auto ">
                <div className="flex gap-2">

                    {/*{hasBackButton &&*/}
                    {/*    (<Link to="/dashboard">*/}
                    {/*        <Button size="sm" variant={"ghost"} className=" size-8">*/}
                    {/*            <ArrowLeft className="size-4 font-semibold "/>*/}
                    {/*        </Button>*/}
                    {/*    </Link>)*/}
                    {/*}*/}
                    <Button size="sm">Queue Up</Button>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant={"outline"} className="h-8">
                        New Application
                    </Button>
                    {!isMobile && (<>
                        <Link to="/dashboard/api-key">
                            <Button size="sm" variant={"outline"} className="h-8">
                                <HeartIcon className="fill-red-500 stroke-0"/>
                                Contribute
                            </Button>
                        </Link>
                        <Link to="/dashboard/api-key">
                            <Button size="sm" variant={"outline"} className="h-8">
                                Docs
                            </Button>
                        </Link>
                    </>)}

                    <UserButton/>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNav;
