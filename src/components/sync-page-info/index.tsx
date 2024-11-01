import { PAGE_INFO_KEY } from "@/constant";
import { UIMatchWithHandle } from "@/types";
import { filterForJson } from "@/utils/filter";
import { useEffect, useMemo } from "react";
import { useMatches } from "react-router-dom";

export function SyncPageInfo() {
    const matches = useMatches() as UIMatchWithHandle<unknown>[];
    const handle = useMemo(() => matches.at(-1)?.handle, [matches]);

    useEffect(() => {
        sessionStorage.setItem(PAGE_INFO_KEY, JSON.stringify(filterForJson(handle)));
    }, [handle]);

    return null;
}

export function getPageInfo() {
    const pageInfo = sessionStorage.getItem(PAGE_INFO_KEY);
    if(!pageInfo) return {};
    return JSON.parse(pageInfo);
}