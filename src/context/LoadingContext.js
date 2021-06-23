import React, { useState, createContext } from "react";

export const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);


    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};