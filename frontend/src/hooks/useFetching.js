import {useCallback, useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetching = useCallback(async () => {
         try {
             setIsLoading(true);
             
             await callback();
         }
         catch (e) {
             setError(e.message);
         }
         finally {
             setIsLoading(false);
         }
    }, [callback]);
    return [fetching, error, isLoading];
}