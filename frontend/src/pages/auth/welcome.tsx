import Heading from "@/components/heading";
import LoadingSpinner from "@/components/loading-spinner";
import { NavBar } from "@/components/nav-bar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { IUserDocument } from "@/types/user-types";
import { API_URL } from "@/services";

type res = { success: boolean; user: IUserDocument };

const WelcomePage = () => {
    const { userId: externalId } = useAuth();
    const { user } = useUser();
    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    const { data } = useQuery({
        queryKey: ["logged-user"],
        queryFn: async () => {
            console.log(API_URL + "/users/sync-user-with-db");
            const res = await fetch(`${API_URL}/users/sync-user-with-db`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });
            return await res.json();
        },
        // refetchInterval: 3000,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${API_URL}/users`, {
                externalId,
                email: user?.emailAddresses[0].emailAddress,
            });
            return response.data as res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["logged-user"],
            });
        },
    });

    useEffect(() => {
        // mutate();
    }, []);

    return (
        <>
            <NavBar />
            <div className="w-full my-10 flex justify-center py-20 flex-col">
                <LoadingSpinner />
                <Heading className="text-center mt-10">
                    Creating your Account...
                </Heading>
                <p className="text-sm/6 text-gray-500 font-medium max-w-prose  text-center mx-auto mt-4">
                    Just a moment while we set things up for you.
                </p>
                <div className="mx-auto flex mt-20">
                    <Button
                        onClick={() => {
                            mutate();
                        }}
                        disabled={isPending}
                    >
                        Trigger
                    </Button>
                </div>
                {JSON.stringify(data)}
            </div>
        </>
    );
};

export default WelcomePage;
