import {
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export const QueryProvider = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (err) => {
                        let errorMessage: string;
                        if (err instanceof Error) {
                            errorMessage = err.message;
                        } else {
                            errorMessage = "An unknown error occurred.";
                        }
                        // toast notify user, log as an example
                        console.log(errorMessage);
                    },
                }),
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
