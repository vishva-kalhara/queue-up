import {DashboardAppCard} from "@/pages/dashboard/app-card.tsx";

const DashboardPage = () => {
    return (
        <section className="bg-white min-h-[60dvh]">

            <div className="px-8 lg:px-0 py-8 lg:py-16 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
                {[0, 1, 2, 3, 4].map((_, i) => (
                    <DashboardAppCard key={i}/>
                ))}
            </div>
        </section>
    );
};

export default DashboardPage;
