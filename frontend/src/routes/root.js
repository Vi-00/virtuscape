import {Link, Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link  to={`/`}>Home</Link>
                    </li>
                    <li>
                        <Link  to={`/guides`}>Guides</Link>
                    </li>
                    <li>
                        <Link  to={`/games`}>Games</Link>
                    </li>
                    <li>
                        <Link  to={`/login`}>Login</Link>
                    </li>
                </ul>
            </nav>
            <div id="detail" >
                <Outlet />
            </div>
        </>
    );
}
