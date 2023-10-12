import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

function useError() {
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }, [error]);
    
    const handleError = (error: unknown) => {
        if (isAxiosError(error)) {
            if (error?.response?.data && typeof error?.response?.data === "string") {
                const message = error.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
            } else {
                setError("Unrecognized axios error");
            }
        } else {
            console.error("Unknown error", error);
            setError("Unknown error");
        }
    };

    const resetError = () => setError(undefined);

    return { error, resetError, handleError };
}

export default useError;