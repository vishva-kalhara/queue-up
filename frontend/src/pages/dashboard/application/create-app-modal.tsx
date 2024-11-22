import { Modal } from "@/components/ui/modal.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useAuth } from "@clerk/clerk-react";
import { API_URL } from "@/services";

type props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const CreateApplicationModal = ({ isOpen, setIsOpen }: props) => {
    const queryClient = useQueryClient();
    const [txtTitle, setTxtTitle] = useState<string>("");
    const [lblError, setLblError] = useState<string>("");
    const { getToken } = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await axios.post(
                `${API_URL}/applications`,
                {
                    title: txtTitle,
                },
                {
                    headers: {
                        Authorization: `Bearer ${await getToken()}`,
                    },
                }
            );
        },
        onSuccess: () => {
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["my-apps"] });
            setTxtTitle("");
            setLblError("");
        },
        onError: (error: AxiosError) => {
            setLblError((error.response?.data as { message: string }).message);
        },
    });

    const submitForm = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (txtTitle.trim() === "") return setLblError("Please enter a title");

        mutate();
    };

    return (
        <Modal showModal={isOpen} setShowModal={setIsOpen}>
            <div className="px-8 py-4 flex flex-col">
                <h1 className="text-lg/7 font-semibold font-poppins">
                    Create new Application
                </h1>
                <p className="text-sm/5 text-gray-600 mt-2">
                    Effortlessly create and manage waitlists to capture and
                    organize user interest for your project.
                </p>
                <form
                    onSubmit={submitForm}
                    className="w-full flex flex-col mt-8"
                >
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Title</Label>
                        <Input
                            id="name"
                            placeholder="Title of your Application"
                            value={txtTitle}
                            onChange={(e) => setTxtTitle(e.target.value)}
                        />
                        {lblError && (
                            <p className="text-sm/4 text-red-500 font-semibold">
                                {lblError}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="mt-8 py-6 mb-2"
                        disabled={isPending}
                    >
                        {!isPending ? "Create Project" : "Processing..."}
                    </Button>
                </form>
            </div>
        </Modal>
    );
};
