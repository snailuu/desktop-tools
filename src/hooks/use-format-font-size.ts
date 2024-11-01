import { Many } from "@/types";
import { getRootSize } from "./use-root-font-size";

function getSize<T extends Many<string | number>>(sizes: T, rootFontSize: number){
    const handler = (fontSize: string | number) => {
        if(typeof fontSize === 'string') {
            const numFontSize = parseFloat(fontSize);
            if(isNaN(numFontSize)) return fontSize;
            if(String(numFontSize) === fontSize) return `${numFontSize}rem`;
            return fontSize;
        }
        return `${fontSize / rootFontSize}rem`
    }

    if(Array.isArray(sizes)) {
        return sizes.map(handler) as T extends unknown[] ?  string[] : string;
    }
    return handler(sizes as string | number) as T extends unknown[] ? string[] : string;
}

export function formatSize<T extends Many<string | number>>(size: T){
    const rootSize = getRootSize();
    return getSize(size, rootSize);
}