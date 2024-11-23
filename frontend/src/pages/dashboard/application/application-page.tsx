import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import AppTabs from "./app-tabs";
import DashboardNav from "../dashboard-nav";

const ApplicationPage = () => {
    return (
        <>
            <DashboardNav />
            <section className="bg-white min-h-[90dvh]">
                <div className="border-b-[1px] border-black border-opacity-10 ">
                    <div className=" max-w-4xl mx-auto px-8 py-8 lg:px-0 flex justify-between">
                        <div className="flex gap-2 items-center">
                            <Link to="/dashboard">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="size-4" />
                                </Button>
                            </Link>
                            <h1 className="text-lg font-semibold font-poppins my-auto">
                                Wallet-101
                            </h1>
                        </div>
                        <div className="flex ">
                            <AppTabs />
                        </div>
                    </div>
                </div>
                <div className="px-8 lg:px-0 py-8 lg:py-16 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
                    <Outlet />
                </div>
            </section>
        </>
    );
};

export default ApplicationPage;
