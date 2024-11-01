import { AppList } from "@/components/app-list";
import { FlexDirection } from "@/components/loading/base";
import { memo } from "react";
import { TbHomeFilled } from "react-icons/tb";
import styled from "styled-components";


const ApplistBox = styled(AppList)`
    margin: 0 0.5rem;
`

export const AsideAppList = memo(() => {
    return (
        <ApplistBox 
            needActiveStyle
            direction={FlexDirection.COLUMN}
            shadowOption={{ $blur: '0.8rem'}}
            appListHandler={(list) => [{name: '首页', path: '/', icon: <TbHomeFilled/>, ...list}]}
        />
    )
})