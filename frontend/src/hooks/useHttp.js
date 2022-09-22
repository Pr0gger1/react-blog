import {useState, useCallback} from "react";

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [requestError, setRequestError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setIsLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                setRequestError(data);
            }
            return data;
        }
        catch (e) {
            setRequestError(e);
        }
        finally {
            setIsLoading(false);
        }

    }, []);
    const clearError = () => setRequestError(null);
    return { request, isLoading, requestError, clearError};
}