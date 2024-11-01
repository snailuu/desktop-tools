import { Many } from "@/types";
import { TObject } from "@cmtlyt/base";
import { isValidElement } from "react";


export function pick<T extends object, K extends keyof T>(obj: T, keys: Many<K>): Pick<T,K> {
    if(!Array.isArray(keys)) keys = [keys] as Many<K>;
    const temp = {} as Pick<T, K>;
    (keys as K[]).forEach((key) => {
        temp[key] = obj[key]
    })
    return temp;
}

const jsonTypes = ['string','number','boolean','object','undefined']

function isJson(value: unknown) {
    return jsonTypes.includes(typeof value) && !isValidElement(value);
}

export function filterForJson<T>(obj: T):T {
    if(!obj) return obj;
    if(!isJson(obj)) return undefined as T;
    if(Array.isArray(obj)) return obj.map(filterForJson) as unknown as T;
    if(typeof obj === 'object' && obj !== null) {
        const temp: TObject<unknown> = {};
        Object.entries(obj as TObject<unknown>).forEach(([key, value]) => (temp[key] = filterForJson(value)))
        return temp as T;
    }
    return obj;
}