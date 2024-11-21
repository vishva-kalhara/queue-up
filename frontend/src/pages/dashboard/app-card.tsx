import {ArrowRight, Clock, Database, Play} from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

type props = {
}

export const DashboardAppCard = ({}: props) => {
    return (
    <div
        className="relative border-[1px] border-black/10 p-8 rounded-lg border-s-[6px] border-s-[#22C55E] flex flex-col">
        <h2 className="font-semibold text-xl/4">wallet-101</h2>
        <div className="flex flex-col gap-1 mt-4">
            <p className="text-gray-500 flex gap-2 items-center"><Clock className="size-4"/>Last request
                12
                mins ago</p>
            <p className="text-gray-500 flex gap-2 items-center"><Database className="size-4"/>Total 54
                Users</p>
        </div>
        <div className="flex justify-between mt-8">
            <Link to="/dashboard/slug">
                <Button className="" variant="outline" size="sm">Overview <ArrowRight
                    className="size-4"/></Button>
            </Link>
            <Button className="" variant="secondary" size="sm">
                <Play className="size-4 fill-black"/>
                {/*<Pause className="size-4 fill-black"/>*/}
            </Button>
        </div>
    </div>)
}