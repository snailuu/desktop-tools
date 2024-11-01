import { FlexAlign, ShadowFlexBox } from "@/components/loading/base";
import { getLayoutStore, useLayoutStoreSlice } from "@/store";
import { BsTextIndentLeft } from "react-icons/bs";
import styled from "styled-components";
import { Crumbs } from "./crumbs";

const FooterContent = styled(ShadowFlexBox)`
    padding: 1rem 2rem;
`;

const ExpandIcon = styled(BsTextIndentLeft)<{ $expandAside: boolean}>`
    font-size: 2rem;
    transition: transform 300ms;
    transform: ${({ $expandAside }) => $expandAside ? "rotate(90deg)" : "rotate(0)"};
`

export function Footer() {
    const { expandAside } = useLayoutStoreSlice('expandAside');
    const onExpand = () => {
        getLayoutStore().setExpandAside(!expandAside);
        console.log('footer-expand-icon', { expandAside: !expandAside });
    }

    return (
        <footer>
            <FooterContent $gap="1" $alignItems={FlexAlign.CENTER}>
                <ExpandIcon onClick={onExpand} $expandAside={expandAside}/>
                <Crumbs />
            </FooterContent>
        </footer>
    )
}