import { IApplicationDoc } from "@/types/application-types";
import { createContext } from "react";

export const ApplicationContext = createContext<IApplicationDoc | undefined>(
    undefined
);
