import { FlexDirection, ShadowFlexBox } from "@/components/loading/base";
import { useRootFontSize } from "@/hooks/use-root-font-size";
import { useLayoutStoreSlice } from "@/store";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AsideAppList } from "./aside-app-list";


const AsideContent = styled(ShadowFlexBox)`
    height: 100%;
    overflow: hidden;
`

interface AsideWrapperProps {
    $width: string;
    $expandAside: boolean;
}

const AsideWrapper = styled.aside<AsideWrapperProps>`
    position: relative;
    display: grid;
    grid-template-columns: ${({ $width, $expandAside}) => ($expandAside ? $width : '0')};
    transition: grid-template-columns 300ms;
`

export function Aside() {
    const rootFontSize = useRootFontSize();
    const [width, setWidth] = useState('');
    const asideRef = useRef<HTMLDivElement>(null);
    const { expandAside } = useLayoutStoreSlice('expandAside');

    useEffect(() => {
        if(!asideRef.current) return;
        setWidth(`${asideRef.current.offsetWidth / rootFontSize}em`);
    }, [rootFontSize]);

    return (
        <AsideWrapper ref={asideRef} $width={width} $expandAside={expandAside}>
            <AsideContent $direction={FlexDirection.COLUMN}>
                <AsideAppList />
            </AsideContent>
        </AsideWrapper>
    )
}