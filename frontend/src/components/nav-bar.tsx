import MaxWidthWrapper from "./max-width-wrapper";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { SignOutButton, useAuth } from "@clerk/clerk-react";

export const NavBar = () => {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return null;
    return (
        <nav className="sticky z-[100]  inset-x-0 top-0 w-full border-b shadow-lg  border-grayscale-50 dark:border-grayscale-100 bg-grayscale-0 transition-all px-4">
            <MaxWidthWrapper>
                <div className="flex h-16 items-center justify-between">
                    <a
                        href="/"
                        className="flex z-40  font-poetsen -tracking-tighter text-base/7 text-grayscale-900"
                    >
                        Queue Up
                    </a>

                    {isSignedIn ? (
                        <div className="flex gap-1.5">
                            <SignOutButton>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-600"
                                >
                                    Sign Out
                                </Button>
                            </SignOutButton>
                            <a
                                href="/dashboard"
                                // className={buttonVariants({
                                //     size: "sm",
                                //     className: "flex gap-1.5 items-center",
                                // })}
                            >
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="bg-brand-500"
                                >
                                    Dashboard{" "}
                                    <ArrowRight className="shrink-0 size-4" />
                                </Button>
                            </a>
                        </div>
                    ) : (
                        <div className="flex gap-1.5">
                            <a href="/sign-in">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-500"
                                >
                                    Sign In
                                </Button>
                            </a>
                            <a href="/sign-up">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="bg-brand-500"
                                >
                                    Get Started{" "}
                                    <ArrowRight className="shrink-0 size-4" />
                                </Button>
                            </a>
                        </div>
                    )}
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};
