import { useRouteError } from "react-router-dom";
import Navbar from "./components/navbar";
import "./error-page.css";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <>
            <Navbar/>
            <div class = "container">
                <div id = "message">
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                </div>
            </div>
        </>
    );
}
