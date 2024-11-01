import { createHashRouter, RouteObject } from "react-router-dom";
import { BASENAME } from "./constant";

export const routes: RouteObject[] = [
    {
        path: "/",
        lazy: () => import('../layout')
    }
]

export const routerConfig = createHashRouter(routes, {basename: BASENAME})