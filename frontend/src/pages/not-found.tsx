import Heading from "@/components/heading";
import { NavBar } from "@/components/nav-bar";

const NotFoundPage = () => {
    return (
        <>
            <NavBar />
            <div className="w-full my-10 flex justify-center py-20 flex-col">
                {/* <LoadingSpinner /> */}
                <Heading className="text-center mt-10">
                    Creating your Account...
                </Heading>
                <p className="text-sm/6 text-gray-500 font-medium max-w-prose  text-center mx-auto mt-4">
                    Just a moment while we set things up for you.
                </p>
                <div className="mx-auto flex mt-20">
                    {/* <Button
                onClick={() => {
                    mutate();
                }}
                disabled={isPending}
            >
                Trigger
            </Button> */}
                </div>
                {/* {JSON.stringify(data)} */}
            </div>
        </>
    );
};

export default NotFoundPage;
