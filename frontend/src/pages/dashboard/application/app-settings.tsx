import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clipboard, RefreshCcw, Trash2 } from "lucide-react";

const AppSettings = () => {
    const copySecret = () => {
        navigator.clipboard.writeText("456789");
    };

    return (
        <div className="px-8 lg:px-0 py-10 lg:py-16  max-w-4xl mx-auto flex flex-col gap-8">
            <Card className="">
                <h1 className="font-poppins font-semibold text-base">
                    Application Secret Key
                </h1>
                <p className="text-gray-500 text-sm/5 mt-1">
                    Application's unique Secret Key for authenticating API
                    requests and managing waitlist data securely.
                </p>
                <div className="flex gap-2 mt-6">
                    {/* <Input type="password" className="h-8" disabled value="5454" /> */}
                    <Button size="sm" onClick={() => copySecret()}>
                        <Clipboard className="size-4" />
                        Copy Secret
                    </Button>
                    <Button size="sm" variant="secondary">
                        <RefreshCcw className="size-4" />
                        {"Regenerate"}
                    </Button>
                </div>
            </Card>
            <Card>
                <div className="flex justify-between items-center">
                    <h1 className="font-poppins font-semibold text-base ">
                        Authorization Header
                    </h1>
                    <Button
                        className="size-8"
                        variant="outline"
                        onClick={() => copySecret()}
                    >
                        <ArrowRight className="size-4" />
                    </Button>
                </div>
            </Card>
            <Card>
                <h1 className="font-poppins font-semibold text-base">
                    Delete this application
                </h1>
                <p className="text-gray-500 text-sm/5 mt-1">
                    Once you delete a app, there is no going back. Please be
                    certain.
                </p>
                <div className="flex gap-2 mt-6">
                    <Button size="sm" variant="destructive">
                        <Trash2 className="size-4" />
                        Delete Application
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default AppSettings;
