import { useEffect, useState } from "react";
import { UserContext } from "./AuthContext"
import axiosInstance from "../utils/axiosInstance";


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(!user) return;

        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = axiosInstance.get('/auth/profile');
                setUser(response.data)
            } catch (error) {
                console.error("User not authenticated", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser()
    }, [user])

    return (
        <UserContext.Provider value={{user, isLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;