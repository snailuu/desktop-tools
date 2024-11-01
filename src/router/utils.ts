import { BASENAME} from './constant';
import { RouteObject } from 'react-router-dom';

const pages = import.meta.glob('../pages/**/page.tsx');

export function getRoutePath(path: string) {
    return `${BASENAME}/${path}`.replace(/\/+/g, '/').replace(/\/+$/g, '');
}

export function generateRouteConfig(path: string, children?: RouteObject[], pageDir?: string):RouteObject {
    let _pageDir = (pageDir || path)
    .replace(/^\/+/, '')
    .replace(/\/+$/,'')
    .replace(/\/:\w+\??/, '');

    if(!_pageDir) _pageDir = 'index';
    return {
        path,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lazy: pages[`../pages/${_pageDir}/page.tsx`] as any,
        children
    }

}