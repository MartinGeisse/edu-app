import {ReactNode} from "react";
import {useDependencyInjector} from "./DependencyInjection/useDependencyInjector";
import {useNavigateToPlayerSelectionPage} from "./AppRoutes";
import {useEffectOnce} from "../Util/useEffectOnce";

export interface PlayerSelectionInterceptorProps {
    children: ReactNode;
}

export function PlayerSelectionInterceptor(props: PlayerSelectionInterceptorProps) {
    const injector = useDependencyInjector();
    const navigateToPlayerSelectionPage = useNavigateToPlayerSelectionPage();
    useEffectOnce(() => {
        if (injector.session.playerId === null) {
            // We don't handle default player creation here because then you could, in theory, get stuck on an
            // empty player selection page when opening that page directly because it isn't covered by this interceptor.
            navigateToPlayerSelectionPage();
        }
    });
    return <>{injector.session.playerId !== null && props.children}</>;
}
