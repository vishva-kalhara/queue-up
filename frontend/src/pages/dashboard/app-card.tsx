import { ArrowRight, Clock, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { IMyApp } from "@/types/application-types";

export const DashboardAppCard = ({ app }: { app: IMyApp }) => {
    return (
        <div
            className={cn(
                "border-[1px] border-black/10 p-8 rounded-lg border-s-[6px] flex flex-col",
                app.isListening ? "border-s-[#22C55E]" : "border-s-[#F5A623]"
            )}
        >
            <h2 className="font-semibold text-xl/4">{app.title}</h2>
            <div className="flex flex-col gap-1 mt-4">
                <p className="text-gray-500 flex gap-2 items-center">
                    <Clock className="size-4" />
                    {app.userCount != 0 && "Last request"} {app.lastReq}
                </p>
                <p className="text-gray-500 flex gap-2 items-center">
                    <Database className="size-4" />
                    Total {app.userCount} users
                </p>
            </div>
            <div className="flex justify-between mt-8">
                <Link to={`/application/${app._id}`}>
                    <Button className="" variant="outline" size="sm">
                        Overview <ArrowRight className="size-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};
