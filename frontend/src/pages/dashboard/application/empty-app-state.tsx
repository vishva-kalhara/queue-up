import { Card } from "@/components/ui/card";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { API_URL } from "@/services";

const EmptyAppState = () => {
    const codeSnippet = `await fetch('${API_URL}/waitlist', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify(
            {
                "appSecretKey": "APP_SECRET_KEY",
                "data": {
                    "email": "",  
                    "firstName": "", // (OPTIONAL)
                    "lastName": "", // (OPTIONAL)
                }
            }
        )
    })`;

    return (
        <div className="px-8 lg:px-0 py-10 lg:py-16  max-w-4xl mx-auto">
            <Card className="pt-8 pb-4">
                <h1 className="font-poppins text-xl/8 font-semibold text-center">
                    Add users to your Waitlist.
                </h1>
                <p className="max-w-prose mx-auto text-center text-sm/6 text-gray-500">
                    Get started by sending a request to Queue Up API.
                </p>

                <div className="w-full max-w-lg bg-white rounded-lg shadow-lg  overflow-hidden mt-12 mx-auto">
                    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <div className="size-3 bg-red-500 rounded-full" />
                            <div className="size-3 bg-yellow-500 rounded-full" />
                            <div className="size-3 bg-green-500 rounded-full" />
                        </div>

                        <span className="text-gray-400 text-sm">
                            waitlist.js
                        </span>
                    </div>
                    <SyntaxHighLighter
                        language="javascript"
                        style={atomDark}
                        customStyle={{
                            borderRadius: "0px",
                            margin: 0,
                            padding: "1rem",
                            fontSize: ".875rem",
                            lineHeight: "1.5",
                        }}
                    >
                        {codeSnippet}
                    </SyntaxHighLighter>
                </div>

                <div className="mt-8 flex items-center space-x-2 w-full justify-center">
                    <div className="size-2 animate-pulse bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-500">
                        Listening to incomming requests...
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default EmptyAppState;
