import NavigationLinks from "./NavigationLinks";

export default function Sidebar() {
    return (
        <aside className="h-fit bg-background overflow-hidden border border-border rounded-[var(--radius)] w-[300px] select-none max-lg:hidden sticky items-start">
            <NavigationLinks/>
        </aside>
    );
}
