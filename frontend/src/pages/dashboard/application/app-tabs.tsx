import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChartLine, Settings2, Table } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const AppTabs = () => {
    const param = useParams();
    const location = useLocation();
    const [page, setPage] = useState<"overview" | "waitlist" | "settings">(
        "overview"
    );

    useEffect(() => {
        if (
            location.pathname.endsWith("waitlist") ||
            location.pathname.endsWith("waitlist/")
        ) {
            setPage("waitlist");
        } else if (
            location.pathname.endsWith("settings") ||
            location.pathname.endsWith("settings/")
        ) {
            setPage("settings");
        } else {
            setPage("overview");
        }
    }, [location, page]);

    return (
        <div className="bg-[#fff] p-2 flex gap-2 rounded-lg">
            <Link to={`/application/${param.appId}`}>
                <Button
                    variant={page == "overview" ? "default" : "outline"}
                    className={cn(
                        "h-8 w-8",
                        page != "overview" ? "text-gray-500" : ""
                    )}
                >
                    <ChartLine className="size-4" />
                </Button>
            </Link>
            <Link to={`/application/${param.appId}/waitlist`}>
                <Button
                    variant={page == "waitlist" ? "default" : "outline"}
                    className={cn(
                        "h-8 w-8",
                        page != "waitlist" ? "text-gray-500" : ""
                    )}
                >
                    <Table className="size-4" />
                </Button>
            </Link>
            <Link to={`/application/${param.appId}/settings`}>
                <Button
                    variant={page == "settings" ? "default" : "outline"}
                    className={cn(
                        "h-8 w-8",
                        page != "settings" ? "text-gray-500" : ""
                    )}
                >
                    <Settings2 className="size-4" />
                </Button>
            </Link>
        </div>
    );
};

export default AppTabs;
