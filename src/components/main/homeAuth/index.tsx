import { useRouter } from "next/router";
import React from "react"
import { useAuth } from "../../../../context/AuthContext";
import UserHomeComponent from "../user/home";

const HomeAuthComponent = () => {
    const { user, logout } = useAuth();
    const router = useRouter()

    return (
        <>
            <div>
                {/* {user ?  */}
                <UserHomeComponent />
                {/* :
                    <></> */}
                {/* } */}
            </div>
        </>
    )
}

export default HomeAuthComponent;