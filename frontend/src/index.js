import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import ErrorPage from "./error-page";
import Root from "./routes/root";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Guides from "./routes/guides";
import Games from "./routes/games";
import Login from "./routes/login";
import Home from "./routes/home";
import TicTacToe from "./routes/games/tick-tac-toe";
import Guessing from "./routes/games/guessing";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/guides",
                element: <Guides/>
            },
            {
                path: "/games",
                element: <Games/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/games/tic-tac-toe",
                element: <TicTacToe />
            },
            {
                path: "/games/guessing",
                element: <Guessing/>
            }
        ]
    }
]);

root.render(
    <React.StrictMode>
        {/*<App />*/}
        <RouterProvider router={router}/>
    </React.StrictMode>
);
