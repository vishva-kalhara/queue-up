import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clipboard, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import RegenerateAPIKeyModal from "./regenerate-api-key-modal";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { API_URL } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import { IUserDocument } from "@/types/user-types";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type resMe = {
    status: string;
    user: IUserDocument;
};

const ApiKeyPage = () => {
    const { getToken } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [userApiKey, setUserApiKey] = useState<string>("");

    const { data, isFetching } = useQuery<AxiosResponse<resMe>>({
        queryKey: ["user-api-key"],
        queryFn: async () => {
            return axios.get(`${API_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });
        },
    });

    useEffect(() => {
        if (!isFetching && data) setUserApiKey(data.data.user.apiKey);
    }, [isFetching]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`Bearer ${userApiKey}`);
        toast({
            variant: "success",
            title: "Authorization header copied to clipboard.",
        });
    };

    return (
        <section className="bg-white min-h-[90dvh] flex flex-col">
            <div className="border-b-[1px] border-black border-opacity-10 ">
                <div className=" max-w-4xl mx-auto px-8 py-8 lg:px-0 flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Link to="/dashboard">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="size-4" />
                            </Button>
                        </Link>
                        <h1 className="text-lg font-semibold font-poppins my-auto">
                            Authorization Header
                        </h1>
                    </div>
                    <div className="flex "></div>
                </div>
            </div>
            <div className="px-8 lg:px-0 py-10 lg:py-16  max-w-4xl mx-auto flex flex-col gap-8">
                <Card className="">
                    <h1 className="font-poppins font-semibold text-base">
                        User API Key
                    </h1>
                    <p className="text-gray-500 text-sm/5 mt-1">
                        A unique identifier assigned to each user, used as the
                        Authorization header with the Bearer prefix to
                        authenticate API requests. This key provides secure
                        access to all your associated projects and endpoints.
                    </p>
                    <p className="text-red-500 text-sm/5 font-medium mt-1">
                        Keep this key private and do not share it with anyone to
                        ensure the security of your data and resources.
                    </p>
                    <div className="flex gap-2 mt-6">
                        {/* <Input type="password" className="h-8" disabled value="5454" /> */}
                        <Button size="sm" onClick={() => copyToClipboard()}>
                            <Clipboard className="size-4" />
                            Copy Secret
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <RefreshCcw className="size-4" />
                            {"Regenerate"}
                        </Button>
                    </div>
                </Card>
            </div>
            <RegenerateAPIKeyModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
            />
        </section>
    );
};

export default ApiKeyPage;
