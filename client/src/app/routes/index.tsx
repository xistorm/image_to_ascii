import { Header } from "@/widgets";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FC } from "react";

const Index: FC = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Index,
});
