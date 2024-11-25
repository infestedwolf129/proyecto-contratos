import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles_files/login/login.css";

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
}