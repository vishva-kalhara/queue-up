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
import { cn } from "@/lib/utils";
import EmptyAppState from "./empty-app-state";
import ChangeAppStateModal from "./change-app-state-model";

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
    const [isOpenChangeStateModal, setIsOpenChangeStateModal] = useState(false);

    const [chartData, setChartData] = useState<
        { _id: string; value: number }[]
    >([]);

    const { data, isFetching } = useQuery<AxiosResponse<res>>({
        queryKey: ["app-overview", appId],
        queryFn: async () => {
            return axios.get(
                `${API_URL}/applications/overview-stats/${appId}`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
        },
    });

    useEffect(() => {
        if (!isFetching && data != undefined) {
            setChartData(data?.data.chartData);
        }
    }, [data, isFetching]);

    if (data?.data.totalWaitlistUsers == 0) return <EmptyAppState />;

    return (
        <>
            <div className="px-8 lg:px-0 py-10 lg:py-16  max-w-4xl mx-auto flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Card className="h-48 flex flex-col">
                        <div className="flex flex-col">
                            <h1 className="font-poppins font-semibold text-base text-black">
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
                            <Button
                                className="mt-14"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsOpenChangeStateModal(true)}
                            >
                                {!data?.data.isListening ? (
                                    <>
                                        <Play className="size-4 fill-black" />{" "}
                                        Go Live
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
                            <h1 className="font-poppins font-semibold text-base text-gray-600">
                                Total waitlist
                            </h1>
                            <h1 className="font-poppins font-semibold text-4xl mt-2">
                                {data?.data.totalWaitlistUsers} users
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
                        {chartData.length > 1 ? (
                            <>
                                <h1 className="font-poppins font-semibold text-base text-black mb-8">
                                    Showing total users of all time
                                </h1>
                                <OverviewChart chartData={chartData} />
                            </>
                        ) : (
                            <div className="h-[250px] w-full flex justify-center items-center">
                                <h1 className="font-poppins font-medium text-base text-gray-400 mb-8">
                                    Not enough data to visualize
                                </h1>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
            <ChangeAppStateModal
                isOpen={isOpenChangeStateModal}
                setIsOpen={setIsOpenChangeStateModal}
                isListening={data?.data.isListening || false}
            />
        </>
    );
};

export default AppOverview;

// [
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-03T08:25:34.123Z" },
//       "email": "user1@example.com",
//       "firstName": "Alice",
//       "lastName": "Smith",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-03T14:12:45.789Z" },
//       "email": "user2@example.com",
//       "firstName": "Bob",
//       "lastName": "Johnson",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-04T09:47:12.456Z" },
//       "email": "user3@example.com",
//       "firstName": "Charlie",
//       "lastName": "Brown",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-04T11:30:24.789Z" },
//       "email": "user4@example.com",
//       "firstName": "Diana",
//       "lastName": "Ross",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-05T13:22:11.001Z" },
//       "email": "user5@example.com",
//       "firstName": "Eve",
//       "lastName": "Adams",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-05T15:44:30.654Z" },
//       "email": "user6@example.com",
//       "firstName": "Frank",
//       "lastName": "Miller",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-05T18:10:50.987Z" },
//       "email": "user7@example.com",
//       "firstName": "Grace",
//       "lastName": "Hopper",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-06T07:15:20.123Z" },
//       "email": "user8@example.com",
//       "firstName": "Henry",
//       "lastName": "Ford",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-06T09:40:31.987Z" },
//       "email": "user9@example.com",
//       "firstName": "Ivy",
//       "lastName": "Taylor",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-06T16:55:12.234Z" },
//       "email": "user10@example.com",
//       "firstName": "Jack",
//       "lastName": "White",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-07T12:45:10.654Z" },
//       "email": "user11@example.com",
//       "firstName": "Kelly",
//       "lastName": "Clark",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-07T18:15:40.765Z" },
//       "email": "user12@example.com",
//       "firstName": "Leo",
//       "lastName": "Hill",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-07T20:35:55.321Z" },
//       "email": "user13@example.com",
//       "firstName": "Mia",
//       "lastName": "Moore",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-08T10:25:05.123Z" },
//       "email": "user14@example.com",
//       "firstName": "Noah",
//       "lastName": "Perry",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-08T14:45:15.789Z" },
//       "email": "user15@example.com",
//       "firstName": "Olivia",
//       "lastName": "Evans",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-08T17:50:35.987Z" },
//       "email": "user16@example.com",
//       "firstName": "Paul",
//       "lastName": "Green",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-09T08:05:45.123Z" },
//       "email": "user17@example.com",
//       "firstName": "Quinn",
//       "lastName": "Hall",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-09T12:25:30.456Z" },
//       "email": "user18@example.com",
//       "firstName": "Ruby",
//       "lastName": "King",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-09T15:55:15.654Z" },
//       "email": "user19@example.com",
//       "firstName": "Sophia",
//       "lastName": "Morgan",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-10T07:20:25.234Z" },
//       "email": "user20@example.com",
//       "firstName": "Tom",
//       "lastName": "Norris",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-10T10:30:55.567Z" },
//       "email": "user21@example.com",
//       "firstName": "Uma",
//       "lastName": "O'Neil",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-10T13:15:45.678Z" },
//       "email": "user22@example.com",
//       "firstName": "Victor",
//       "lastName": "Page",
//       "isActive": false
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-10T16:05:10.123Z" },
//       "email": "user23@example.com",
//       "firstName": "Wendy",
//       "lastName": "Queen",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-10T18:55:20.321Z" },
//       "email": "user24@example.com",
//       "firstName": "Xander",
//       "lastName": "Ray",
//       "isActive": true
//     },
//     {
//       "app": { "$oid": "67405c2cf99e9413cdb99b84" },
//       "createdAt": { "$date": "2024-11-10T21:30:50.987Z" },
//       "email": "user25@example.com",
//       "firstName": "Yara",
//       "lastName": "Zane",
//       "isActive": false
//     }
//   ]
