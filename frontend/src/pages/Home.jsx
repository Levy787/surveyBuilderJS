import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/auth/useAuthContext";   

export default function Home() {
    const {user} = useAuthContext();
    return (
    <>
        <div>HOME PAGE</div>
        {user && <span>{user.email}</span>}
    </>);
}
