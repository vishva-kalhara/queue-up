import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, Outlet, useParams } from "react-router-dom";
import AppTabs from "./app-tabs";
import DashboardNav from "../dashboard-nav";
import { ApplicationContext } from "@/contexts/application-provider";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import { IApplicationDoc } from "@/types/application-types";
import LoadingSpinner from "@/components/loading-spinner";
import { useEffect, useState } from "react";

type res = {
    status: string;
    app: IApplicationDoc;
};

const ApplicationPage = () => {
    const { appId } = useParams();
    const { getToken } = useAuth();

    const [appData, setAppData] = useState<IApplicationDoc | undefined>(
        undefined
    );

    const { data, isFetching, isSuccess } = useQuery<AxiosResponse<res>>({
        queryKey: ["app"],
        queryFn: async () => {
            return await axios.get(`${API_URL}/applications/${appId}`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });
        },
    });

    useEffect(() => {
        if (!isFetching && isSuccess) setAppData(data?.data.app);
    }, [data, isFetching, isSuccess]);

    return (
        <>
            <DashboardNav />
            {isFetching ? (
                <LoadingSpinner className="mt-28" />
            ) : (
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
                                    {data?.data.app.title}
                                </h1>
                            </div>
                            <div className="flex ">
                                <AppTabs />
                            </div>
                        </div>
                    </div>

                    <ApplicationContext.Provider value={appData}>
                        <Outlet />
                    </ApplicationContext.Provider>
                </section>
            )}
        </>
    );
};

export default ApplicationPage;
