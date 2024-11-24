import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

type props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const RegenerateAPIKeyModal = ({ isOpen, setIsOpen }: props) => {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    const { mutate: regerateToken, isPending } = useMutation({
        mutationFn: async () => {
            const newToken = uuidv4();
            return await axios.patch(
                `${API_URL}/users/update-me`,
                {
                    apiKey: newToken,
                },
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-api-key"] });
            setIsOpen(false);
            toast({
                description: "User API Key regenerated.",
            });
        },
        onError: (err) => {
            console.error(err);
        },
    });

    return (
        <Modal showModal={isOpen} setShowModal={setIsOpen}>
            <div className="px-8 pt-4 pb-8 flex flex-col">
                <div className="bg-[#F5F5F4] w-full flex justify-center rounded-xl py-10">
                    <img src="/warning-logo.png" width={120} />
                </div>
                <h1 className="font-poppins font-semibold text-xl text-center mt-10 ">
                    Regenerate User API Key
                </h1>
                <p className="text-gray-500 text-sm/5 text-center max-w-prose mt-2">
                    If you regenerate this token, you must replace the
                    Authorization headers in all your applications to ensure
                    uninterrupted access.
                </p>
                <Button
                    className="mt-8 py-6"
                    variant="destructive"
                    onClick={() => regerateToken()}
                    disabled={isPending}
                >
                    {!isPending ? "Confirm Regenerate" : "Processing..."}
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

export default RegenerateAPIKeyModal;
