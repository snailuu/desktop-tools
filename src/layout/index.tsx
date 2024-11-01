import { FlexBox, FlexDirection } from "@/components/base";
import { Watermark } from "antd";
import styled from "styled-components";
import { LayoutLoading } from "./loading";
import { SyncPageInfo } from "@/components/sync-page-info";
import { Message } from "@/components/message";
import { Aside } from "./aside";
import { Header } from "./header";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";


const PageWrapper = styled(FlexBox)`
    position: relative;
    overflow-y: auto;
`;

const WatermarkStyle = styled(Watermark)`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export function Component() {
    return (
        <WatermarkStyle content={['snailuu','desktop-tools']} font={{color: 'rgba(0,0,0,0.05'}}>    
            <LayoutLoading/>
            <SyncPageInfo/>
            <Message />
            <FlexBox $flex='1' style={{ height: '100%'}}>
                <Aside/>
                <FlexBox $flex='1' $direction={FlexDirection.COLUMN} style={{ overflow: 'hidden'}}>
                    <Header/>
                    <PageWrapper $flex='1' $direction={FlexDirection.COLUMN}>
                        <Outlet />
                    </PageWrapper>
                    <Footer/>
                </FlexBox>
            </FlexBox>
        </WatermarkStyle>
    )
}