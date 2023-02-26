import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {AdminMenuPage} from "./AdminMenuPage";
import {OverviewPage} from "../Game/OverviewPage";
import React from "react";
import {AtomPage} from "../Game/Atom/AtomPage";
import {PlayerSelectionPage} from "./PlayerSelectionPage";
import {PlayerSelectionInterceptor} from "./PlayerSelectionInterceptor";
import {BASE_PATH} from "../config";

function AtomPageWrapper() {
    const {id} = useParams<{ id: string }>();
    if (!id) {
        throw new Error("no atom id");
    }
    return <AtomPage id={id} />;
}

function AppRoutesThatNeedPlayer() {
    return <PlayerSelectionInterceptor>
        <Routes>
            <Route path="/:id" element={<AtomPageWrapper />} />
            <Route path="/" element={<OverviewPage />} />
        </Routes>
    </PlayerSelectionInterceptor>;
}

export function AppRoutes() {
    return <Routes>
        <Route path="/x/adminMenu" element={<AdminMenuPage />} />
        <Route path="/x/selectPlayer" element={<PlayerSelectionPage />} />
        <Route path="/*" element={<AppRoutesThatNeedPlayer />} />
    </Routes>;
}

function applyBasePath(path: string) {
    const pathWithLeadingSlash = (path.startsWith("/") ? "" : "/") + path;
    if (BASE_PATH === "/") {
        if (path === "" || path === "/") {
            return "/";
        } else {
            return pathWithLeadingSlash;
        }
    } else {
        const base = BASE_PATH.endsWith("/") ? BASE_PATH.substring(0, BASE_PATH.length - 1) : BASE_PATH;
        if (path === "" || path === "/") {
            return base;
        } else {
            return base + pathWithLeadingSlash;
        }
    }
}

export function useAppNavigate() {
    const navigate = useNavigate();
    return (to: string) => navigate(applyBasePath(to));
}

export function makeNavigate<PB extends ((...args: any[]) => string)>(
    pathBuilder: PB
): () => (...args: Parameters<PB>) => void {
    return () => {
        const navigate = useAppNavigate();
        return (...args: Parameters<PB>) => navigate(pathBuilder(args));
    };
}

export const useNavigateToOverviewPage = makeNavigate(() => "/");
export const useNavigateToAtomPage = makeNavigate((atomId: string) => `/${atomId}`);
export const useNavigateToAdminMenuPage = makeNavigate(() => "/x/adminMenu");
export const useNavigateToPlayerSelectionPage = makeNavigate(() => "/x/selectPlayer");
