import { RemovePrefix } from "@/types";
import { TExclude } from "@cmtlyt/base";

const ignoreProps = ['children', 'className'];

type IgnoreProps = 'children' | 'className';


export function propsHandler<T extends Record<string, unknown>>(
    props: T,
    userIgnoredProps: string[] = [],
    needProps: string[] = Object.keys(props)
): RemovePrefix<TExclude<T, IgnoreProps>, '$'> {
    const newProps: Record<string, unknown> = {};
    const ignorePropsFinished = [...ignoreProps, ...userIgnoredProps];

    needProps.forEach((key) => {
        if (ignorePropsFinished.includes(key)) return;

        if (key.startsWith('$')) {
            newProps[key.slice(1)] = props[key];
        } else {
            newProps[key] = props[key]
        }

    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return newProps as any;
}


export function applyStyleSheet(key: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (props: any) => {
        const style = props[key];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return style as any;
    };
}