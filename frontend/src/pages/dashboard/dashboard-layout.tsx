import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/services";
import LoadingSpinner from "@/components/loading-spinner";

const DashboardLayout = () => {
    const { getToken } = useAuth();

    const { isFetching } = useQuery({
        queryKey: ["logged-user"],
        queryFn: async () => {
            const res = await fetch(`${API_URL}/users/sync-user-with-db`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });
            return (await res.json()) as { isSynced: boolean };
        },
        refetchOnWindowFocus: false,
    });

    if (isFetching) {
        return <LoadingSpinner />; // Show a spinner while loading
    }

    return <Outlet />;
};

export default DashboardLayout;
