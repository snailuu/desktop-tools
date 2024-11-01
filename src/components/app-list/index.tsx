import { ApplyStyle } from "@/types";
import styled from "styled-components";
import { Link } from "../link";
import { applyStyleSheet } from "../base/utils";
import { FlexAlign, FlexBox, FlexDirection, FlexJustify, FlexWrap, ShadowFlexBox } from "../base";
import { AppInfo, appList } from "./constant";
import { matchPath, useMatches } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { Switch } from "../switch";

interface AppItemProps extends ApplyStyle{
    $isActive?: boolean;
}

const AppItem = styled(Link)<AppItemProps>`
    margin-bottom: 1rem;

    &:last-child {
        margin-bottom: 0;
    }
    
    ${applyStyleSheet('$style')}

    ${(props) => {
        const { $isActive } = props;

        if($isActive) {
            return `color: var(--color-active);`;
        }
    }}
`;

const AppItemContent = styled(ShadowFlexBox)<ApplyStyle>`
    padding: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: var(--radius-button);

    ${applyStyleSheet('$style')}
`

const IconWrap = styled(FlexBox)<ApplyStyle>`
  width: 100%;
  height: 100%;
  font-size: 2.4rem;

  ${applyStyleSheet('$style')}
`;

const AppName = styled.span<ApplyStyle>`
  font-size: 1.2rem;
  line-height: 1;

  ${applyStyleSheet.bind(null, '$style')}
`;

interface AppListProps {
    needActiveStyle?: boolean;
    direction?: FlexDirection;
    shadowOption?: Parameters<typeof ShadowFlexBox>[0];
    className?: string;
    appListHandler?: (appList: AppInfo[]) => AppInfo[];
}

export function AppList(props: AppListProps) {
    const { direction, needActiveStyle, shadowOption, className, appListHandler = (list) => list} = props;

    const matchers = useMatches();

    const lastMatch = useMemo(() => matchers.at(-1), [matchers]);

    const checkActive = useCallback(
        (path: string, deepMatch = false) => {
            if(deepMatch) return needActiveStyle && matchers.some((match) => !!matchPath(match?.pathname || '', path));
            return needActiveStyle && !!matchPath(lastMatch?.pathname || '', path)
        },
        [needActiveStyle, matchers, lastMatch]
    )

    const appListFinished = useMemo(() => {
        return appListHandler(appList);
    }, [appListHandler]);

    return (
        <FlexBox $wrap={FlexWrap.WRAP} $direction={direction} className={className}>
            {appListFinished.map((app) => (
                <AppItem
                    to={app.path}
                    key={app.path}
                    $isActive={checkActive(app.path, app.deepMatch)}
                    $style={app.wrapperStyle}
                    onClick={() => (console.log('app-list-click', app))}
                >
                    <AppItemContent 
                        $direction={FlexDirection.COLUMN}
                        $alignItems={FlexAlign.CENTER}
                        $justifyContent={FlexJustify.BETWEEN}
                        $style={app.contentStyle} 
                        {...shadowOption}
                    >
                        <IconWrap $style={app.iconStyle} $alignItems={FlexAlign.CENTER} $justifyContent={FlexJustify.CENTER}>
                            <Switch if={typeof app.icon === 'string'} fullback={app.icon}>
                                <span>{app.icon}</span>
                            </Switch>
                        </IconWrap>
                        <AppName $style={app.labelStyle}>{app.name}</AppName>
                    </AppItemContent>
                </AppItem>
            ))}
        </FlexBox>
    )

}