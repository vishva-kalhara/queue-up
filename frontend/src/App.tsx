import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/auth/sign-in";
import { SignUpPage } from "./pages/auth/sign-up";
import DashboardPage from "./pages/dashboard/dashboard";
import ApiKeyPage from "./pages/dashboard/api-key-page";
import WelcomePage from "./pages/auth/welcome";
import LandingPage from "./pages/landing/landing-page";
import DashboardLayout from "./pages/dashboard/dashboard-layout";
import NotFoundPage from "./pages/not-found";
import ApplicationPage from "./pages/dashboard/application/application-page";
import { SignedIn } from "@clerk/clerk-react";

function App() {
    return (
        <section className=" min-h-[100dvh] flex flex-col font-sans bg-grayscale-50 text-brand-950 antialiased">
            <Routes>
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />

                <Route
                    path="/welcome"
                    element={
                        <SignedIn>
                            <WelcomePage />
                        </SignedIn>
                    }
                />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route
                        path="application/:title"
                        element={<ApplicationPage />}
                    />
                    <Route path="api-key" element={<ApiKeyPage />} />
                    <Route index element={<DashboardPage />} />
                </Route>
                <Route path="/" element={<LandingPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </section>
    );
}

export default App;
