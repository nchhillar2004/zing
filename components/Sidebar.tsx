import NavigationLinks from "./NavigationLinks";
import SiteLogo from "./SiteLogo";

export default function Sidebar() {

    return (
        <aside className="z-10 py-2 px-4 min-w-[260px] select-none max-md:hidden h-[100vh] sticky items-start max-w-[300px] right-0 top-0 flex flex-col justify-between">
            <SiteLogo/>
            <NavigationLinks/>
        </aside>
    );
}
