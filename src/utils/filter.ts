import { Many } from "@/types";


export function pick<T extends object, K extends keyof T>(obj: T, keys: Many<K>): Pick<T,K> {
    if(!Array.isArray(keys)) keys = [keys] as Many<K>;
    const temp = {} as Pick<T, K>;
    (keys as K[]).forEach((key) => {
        temp[key] = obj[key]
    })
    return temp;
}