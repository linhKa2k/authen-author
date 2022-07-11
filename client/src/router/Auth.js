import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createBrowserHistory } from "history";
import { BASE_URL } from "../container"

const Auth = ({ children }) => {
    const location = useLocation();
    const accessToken = window.localStorage.getItem('auth-token')
    const history = createBrowserHistory({ window })
    console.log(history);

    const staticPagePath = ["/login", "/register"];

    useEffect(() => {
        if (!accessToken) {
            if (staticPagePath.indexOf(location.pathname) === "-1") {
                window.location.href = "http://localhost:3000/login";
            }
        } else {
            if (staticPagePath.includes(location.pathname) === true) {
                let path = location.href
                console.log(path);
                let index = BASE_URL.length

                console.log(index, location.href);




            }
            location.href = "http://localhost:3000/home"
        }
    });
    return <Fragment>{children}</Fragment>;
};

export default Auth;