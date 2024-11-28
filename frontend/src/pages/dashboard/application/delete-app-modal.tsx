import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/services";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";

type props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteAppModal = ({ isOpen, setIsOpen }: props) => {
    const { appId } = useParams();
    const { getToken } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: regerateToken, isPending } = useMutation({
        mutationFn: async () => {
            return await axios.delete(`${API_URL}/applications/${appId}`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["app"] });
            setIsOpen(false);
            toast({
                variant: "destructive",
                description: "Application deleted successfully.",
            });
            navigate("/dashboard", { replace: true });
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
                    Do you want to delete application?
                </h1>
                <p className="text-gray-500 text-sm/5 text-center max-w-prose mt-2">
                    Once you delete, this action cannot be undone.
                </p>
                <Button
                    className="mt-8 py-6"
                    variant="destructive"
                    onClick={() => regerateToken()}
                    disabled={isPending}
                >
                    {!isPending ? "Confirm Delete" : "Processing..."}
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

export default DeleteAppModal;
