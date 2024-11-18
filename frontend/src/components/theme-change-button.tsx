import {MoonIcon, SunMediumIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useTheme} from "@/contexts/theme-provider.tsx";

export function ThemeChangeButton() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setTheme(theme == "light" ? "dark" : "light")}
        >
            {theme === "light" ? (
                <SunMediumIcon className="text-grayscale-1000" />
            ) : (
                <MoonIcon className="text-grayscale-1000" />
            )}
        </Button>
    )
}
