import { ApplicationContext } from "@/contexts/application-provider";
import { IApplicationDoc } from "@/types/application-types";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useApplication = () => {
    const app = useContext(ApplicationContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (app === undefined) {
            navigate("/not-found", { replace: true });
        }
    }, [app, navigate]);

    return app as IApplicationDoc;
};
