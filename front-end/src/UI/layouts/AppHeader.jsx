import { useLocation } from "react-router";

export default function AppHeader() {
    const { pathname } = useLocation();

    const pageTitle = pathname.split("/")[1];

    return (
        <header className="w-full bg-[#0b0c0e] py-5 px-10 border-b border-zinc-800/60 flex items-center">
            <h2 className="capitalize text-lg font-bold tracking-wide text-white">
                {pageTitle }
            </h2>
        </header>
    );
}