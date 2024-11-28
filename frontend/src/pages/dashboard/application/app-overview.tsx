import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import OverviewChart from "./overview-chart";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import LoadingSpinner from "@/components/loading-spinner";
import { cn } from "@/lib/utils";

type res = {
    status: string;
    isListening: boolean;
    totalWaitlistUsers: number;
    chartData: {
        _id: string;
        value: number;
    }[];
};

const AppOverview = () => {
    const { appId } = useParams();
    const { getToken } = useAuth();

    const [chartData, setChartData] = useState<
        { _id: string; value: number }[]
    >([]);

    const { data, isFetching } = useQuery<AxiosResponse<res>>({
        queryKey: ["app-overview", appId],
        queryFn: async () => {
            return axios.get(`${API_URL}/waitlist/overview-stats/${appId}`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });
        },
    });

    useEffect(() => {
        if (!isFetching && data != undefined)
            setChartData(data?.data.chartData);
    }, [data, isFetching]);

    return (
        <div className="px-8 lg:px-0 py-10 lg:py-16  max-w-4xl mx-auto flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Card className="h-48 flex flex-col">
                    <div className="flex flex-col">
                        <h1 className="font-poppins font-semibold text-base">
                            Application Status
                        </h1>
                        <div className="flex">
                            <div className="mt-2 flex items-center space-x-2 w-full">
                                <div
                                    className={cn(
                                        "size-2  rounded-full",
                                        data?.data.isListening
                                            ? "bg-green-500 animate-pulse"
                                            : "bg-red-500"
                                    )}
                                />
                                <span className="text-sm text-gray-500">
                                    {data?.data.isListening
                                        ? "Listening to incomming requests..."
                                        : "Incomming requests are blocked."}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button className="mt-14" variant="outline" size="sm">
                            {!data?.data.isListening ? (
                                <>
                                    <Play className="size-4 fill-black" /> Go
                                    Live
                                </>
                            ) : (
                                <>
                                    <Pause className="size-4 fill-black" />{" "}
                                    Pause requests
                                </>
                            )}
                        </Button>
                    </div>
                </Card>
                <Card className="h-48 flex flex-col">
                    <div className="flex flex-col">
                        <h1 className="font-poppins font-semibold text-base text-gray-500">
                            Total waitlist
                        </h1>
                        <h1 className="font-poppins font-semibold text-4xl mt-2">
                            {data?.data.totalWaitlistUsers || 0} users
                        </h1>
                        <Link
                            to={`/application/${appId}/waitlist?page=1&limit=15&sort=desc`}
                            className="mt-9"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center"
                            >
                                All users
                                <ArrowRight className="size-4" />
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
            <Card>
                <div className="flex flex-col">
                    <h1 className="font-poppins font-semibold text-base text-black mb-8">
                        Showing total users of all time
                    </h1>
                    {chartData ? (
                        <OverviewChart chartData={chartData} />
                    ) : (
                        <div className="h-[250px] w-full flex justify-center items-center">
                            <LoadingSpinner />
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default AppOverview;
