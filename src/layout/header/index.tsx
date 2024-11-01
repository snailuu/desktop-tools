import { AppearBox } from "@/components/appear-box";
import { FlexAlign, FlexBox, FlexJustify, ShadowFlexBox } from "@/components/loading/base";
import { Show } from "@/components/show";
import { UIMatchWithHandle } from "@/types";
import { IoCaretBack } from 'react-icons/io5';
import { useMemo } from "react";
import { useMatches, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface PageInfo {
    title?: string;
    needBackIcon?: boolean;
    rightArea?: React.ReactNode;
}

const HeaderContent = styled(ShadowFlexBox)`
    height: 5rem;
    padding: 0 2rem;
    overflow-x: auto;

    &::-webkit-scrollbar{
        height: 0;
    }
`

const BackIcon = styled(IoCaretBack)`
  margin-right: 1rem;
  padding: 1rem;
  background: var(--color-gray-3);
  border-radius: var(--radius-button);
`;

const TitleText = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.04rem;
`;

const TitleWrapper = styled(FlexBox)`
  flex-shrink: 0;
`;

export function Header() {
    const navigate = useNavigate();
    const matches = useMatches() as UIMatchWithHandle<PageInfo>[];
    const lastMatch = useMemo(() => matches.at(-1), [matches]);

    const title = lastMatch?.handle?.title;
    const needBackIcon = lastMatch?.handle.needBackIcon;
    const rightArea = lastMatch?.handle.rightArea;

    return (
        <HeaderContent $gap='1' $justifyContent={FlexJustify.BETWEEN}>
            <TitleWrapper $alignItems={FlexAlign.CENTER}>
                <Show if={needBackIcon}>
                    <AppearBox onFirstAppear={() => (console.log('header-back-icon'))}>
                        <BackIcon
                            onClick={() => {
                                console.log('header-back-in');
                                navigate(-1);
                            }}
                        />
                    </AppearBox>
                </Show>
                <TitleText>{title}</TitleText>
            </TitleWrapper>
            <FlexBox $alignItems={FlexAlign.CENTER}>{rightArea}</FlexBox>
        </HeaderContent>
    )

}