import { DashboardAppCard } from "@/pages/dashboard/app-card.tsx";
import { API_URL } from "@/services";
import { IMyApp } from "@/types/application-types";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Plus } from "lucide-react";
import { CreateApplicationModal } from "./application/create-app-modal";
import { useState } from "react";
import LoadingSpinner from "@/components/loading-spinner";

interface Res {
    success: "fail" | "success";
    count: number;
    apps: IMyApp[];
}

const DashboardPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getToken } = useAuth();

    const { data, isFetching } = useQuery<AxiosResponse<Res>>({
        queryKey: ["my-apps"],
        queryFn: async () => {
            return await axios.get(`${API_URL}/applications/my-apps`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });
        },
    });

    return (
        <section className="bg-white min-h-[90dvh]">
            <div className="px-8 lg:px-0 py-8 lg:py-16 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
                {data?.data.count == 0 ? (
                    <div
                        onClick={() => {
                            setIsOpen(true);
                        }}
                        className="border-[1px] border-black/10 py-16 rounded-lg flex flex-col bg-[#fafafa]"
                    >
                        <div className="flex flex-col mx-auto gap-4">
                            <div className="flex mx-auto">
                                <div className="p-4 bg-[#fff] relative rounded-full shadow-xl">
                                    <Plus className="size-6" />
                                </div>
                            </div>

                            <p className="font-semibold font-poppins text-lg/7 text-gray-800">
                                Create your first App.
                            </p>
                        </div>
                    </div>
                ) : isFetching ? (
                    <LoadingSpinner className="mt-32" />
                ) : (
                    // <>{JSON.stringify(data?.data.apps)}</>
                    data?.data.apps.map((app, i) => {
                        return <DashboardAppCard key={i} app={app} />;
                    })
                )}
            </div>

            <CreateApplicationModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </section>
    );
};

export default DashboardPage;
