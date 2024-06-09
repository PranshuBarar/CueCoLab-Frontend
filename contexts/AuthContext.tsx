'use client'
import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean,
    setIsAuthenticated: (value: boolean) => void,
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext) as AuthContextType;
    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}