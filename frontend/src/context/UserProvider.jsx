import { useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import axiosInstance from "../utils/axiosInstance";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile');
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("User not authenticated", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
