import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {AdminMenuPage} from "./AdminMenuPage";
import {OverviewPage} from "../Game/OverviewPage";
import React from "react";
import {AtomPage} from "../Game/Atom/AtomPage";
import {PlayerSelectionPage} from "./PlayerSelectionPage";
import {PlayerSelectionInterceptor} from "./PlayerSelectionInterceptor";

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

export function useNavigateToAdminMenuPage(): () => void {
    const navigate = useNavigate();
    return () => navigate("/x/adminMenu");
}

export function useNavigateToPlayerSelectionPage(): () => void {
    const navigate = useNavigate();
    return () => navigate("/x/selectPlayer");
}
