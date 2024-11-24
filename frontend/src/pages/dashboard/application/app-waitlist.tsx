import { API_URL } from "@/services";
import { IWaitlistDoc } from "@/types/waitlist-types";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmptyAppState from "./empty-app-state";

type res = {
    status: string;
    count: number;
    data: IWaitlistDoc[];
};

const AppWaitlist = () => {
    const { appId } = useParams();
    const { getToken } = useAuth();

    const [waitlistData, setWaitlistData] = useState<IWaitlistDoc[]>([]);

    const { data, isFetched } = useQuery<AxiosResponse<res>>({
        queryKey: ["logged-user", "app", "app-waitlist-data"],
        queryFn: async () => {
            return await axios.get(
                `${API_URL}/applications/${appId}/app-waitlist`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
        },
        refetchInterval: (query) => {
            return query.state.data?.data.data.length != 0 ?
                false : 1000;
        },
    });

    useEffect(() => {
        if (isFetched && data) {
            setWaitlistData(data.data.data);
            console.log(data.data);
        }
    }, [isFetched, data]);

    if (waitlistData.length == 0) return <EmptyAppState />;

    return <p className="text-center mt-20 text-lg font-semibold">Has Data</p>;
};

export default AppWaitlist;
