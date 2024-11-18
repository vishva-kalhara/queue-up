/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                poetsen: ["Poetsen One", "sans-serif"], // Add your font
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                grayscale: {
                    0: "var(--grayscale0)",
                    25: "var(--grayscale25)",
                    50: "var(--grayscale50)",
                    100: "var(--grayscale100)",
                    150: "var(--grayscale150)",
                    200: "var(--grayscale200)",
                    300: "var(--grayscale300)",
                    400: "var(--grayscale400)",
                    500: "var(--grayscale500)",
                    600: "var(--grayscale600)",
                    700: "var(--grayscale700)",
                    800: "var(--grayscale800)",
                    850: "var(--grayscale850)",
                    900: "var(--grayscale900)",
                    950: "var(--grayscale950)",
                    975: "var(--grayscale975)",
                    1000: "var(--grayscale1000)",
                },
                brand: {
                    500: "#b1ef72",
                    700: "#2C64E3",
                    900: "var(--brand900)",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
