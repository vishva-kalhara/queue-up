import { API_URL } from "@/services";
import { IWaitlistDoc } from "@/types/waitlist-types";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import WaitlistDataTable from "./data-table";

type res = {
    status: string;
    count: number;
    data: IWaitlistDoc[];
    totalCount: number;
};

const AppWaitlist = () => {
    const { appId } = useParams();
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    // const [sorting, setSorting] = useState<SortingState>([]);
    const [sort, setSort] = useState<"desc" | "asc">(
        (searchParams.get("sort") as "desc" | "asc") || "desc"
    );

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    // const sort = searchParams.get("sort") || "desc"

    const [totalCount, setTotalCount] = useState(0);
    const [waitlistData, setWaitlistData] = useState<IWaitlistDoc[]>([]);
    const [pagination, setPagination] = useState({
        pageIndex: page - 1,
        pageSize: limit,
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("page", (pagination.pageIndex + 1).toString());
        searchParams.set("limit", pagination.pageSize.toString());
        searchParams.set("sort", sort);
        navigate(`${window.location.pathname}?${searchParams.toString()}`, {
            replace: true,
        });
    }, [navigate, pagination.pageIndex, pagination.pageSize, sort]);

    const { data, isFetching } = useQuery<AxiosResponse<res>>({
        queryKey: [
            "logged-user",
            "app-waitlist-data",
            pagination.pageIndex,
            pagination.pageSize,
            appId,
            sort,
        ],
        queryFn: async () => {
            return await axios.get(
                `${API_URL}/applications/${appId}/app-waitlist?
                page=${pagination.pageIndex}
                &limit=${pagination.pageSize}&sort=${sort}`,
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (!isFetching && data) {
            setWaitlistData(data.data.data);
            setTotalCount(data.data.totalCount);
        }
    }, [isFetching, data]);

    return (
        <WaitlistDataTable
            isFetching={isFetching}
            intitialWaitlistData={waitlistData}
            pagination={pagination}
            setPagination={setPagination}
            totalDocs={totalCount}
            setSort={setSort}
        />
    );
};

export default AppWaitlist;
