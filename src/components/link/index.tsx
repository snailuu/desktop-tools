import { getLayoutStore } from "@/store";
import { LinkProps, Link as RouterLink } from "react-router-dom";

export function Link(props: LinkProps) {
    const { onClick, ...rest } = props;

    return (
        <RouterLink
            {...rest}
            onClick={(e) => {
                getLayoutStore().setLoading(true);
                onClick?.(e);
            }}
        />
    )
}