import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";

type props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isListening: boolean;
};

const ChangeAppStateModal = ({ isOpen, setIsOpen, isListening }: props) => {
    const { appId } = useParams();
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    const { mutate: changeStatus, isPending } = useMutation({
        mutationFn: async () => {
            return await axios.patch(
                `${API_URL}/applications/${appId}`,
                {
                    isListening: !isListening,
                },
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["app-overview", appId],
            });
            setIsOpen(false);
            toast({
                variant: isListening ? "destructive" : "default",
                title: `App is ${
                    isListening
                        ? "no longer listening to incomming requests."
                        : "live now."
                }`,
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    return (
        <Modal showModal={isOpen} setShowModal={setIsOpen}>
            <div className="px-8 pt-4 pb-8 sm:pb-4 flex flex-col">
                <div className="bg-[#F5F5F4] w-full flex justify-center rounded-xl py-10">
                    <img src="/warning-logo.png" width={120} />
                </div>
                <h1 className="font-poppins font-semibold text-xl text-center mt-10 ">
                    {isListening
                        ? "Do you want to stop listening to requests?"
                        : "Do you want to listen to incomming requests?"}
                </h1>
                {/* <p className="text-gray-500 text-sm/5 text-center max-w-prose mt-2">
                    Application's unique Secret Key for authenticating API
                    requests and managing waitlist data securely.
                </p> */}
                <Button
                    className="mt-8 py-6"
                    variant="destructive"
                    onClick={() => changeStatus()}
                    disabled={isPending}
                >
                    {!isPending ? "Confirm" : "Processing..."}
                </Button>
                <div className="w-full flex justify-center mt-2">
                    <Button onClick={() => setIsOpen(false)} variant="ghost">
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ChangeAppStateModal;
