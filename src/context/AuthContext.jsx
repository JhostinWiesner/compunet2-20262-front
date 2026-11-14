import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null);

// Returns the token payload, or null if it is missing, unreadable, has no exp or is expired
function leerSesion() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const datos = jwtDecode(token);
        if (datos.exp && datos.exp * 1000 > Date.now()) return datos;
    } catch {
        // malformed token: treat as no session
    }
    localStorage.removeItem('token');
    return null;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(leerSesion);

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser(jwtDecode(token));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
