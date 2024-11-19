import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
}

const Heading = ({ children, className, ...props }: HeadingProps) => {
    return (
        <h1
            className={cn(
                "text-2xl sm:text-3xl text-pretty font-poetsen tracking-tight text-zinc-800",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
};

export default Heading;
